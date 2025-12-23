import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react/jsx-runtime";

function HomePage(props) {
  return(
  <Fragment>
    <Head>
      <title>React MeetUps</title>
      <meta name="description" content="browse the list of highly active React meetUps"/>
    </Head>
    <MeetupList meetups={props.meetups} />
  </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUP
//     }
//   };

// }

export async function getStaticProps() {
  // fetch data from api

  const client = await MongoClient.connect(
    "mongodb+srv://mohsin:aaaa1111@cluster0.t5kw347.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db("meetups");

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
