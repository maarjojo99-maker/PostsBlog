import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://mohsin:aaaa1111@cluster0.t5kw347.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db("meetups");

    const meetupCollection = db.collection("meetups");

    const result = await meetupCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Meetup inserted successfully" });
  }
}

export default handler;
