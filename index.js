require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const client = new MongoClient(uri);

app.use(cors());
 async (req, res) => {
  if (req.url === '/favicon.ico') {
    return res.status(204).end(); // No content response
  }

  // Your regular function code here
  if (req.url === '/backend') {
    res.json(users);
    res.status(200).json({ message: "Hello, world!" });
  }
};

async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to the database successfully!");
    const database = client.db(dbName);
    const collection = database.collection("users");
    const users = await collection.find({}).toArray();
    console.log(users)
    console.log("Users Fetched Successfully!");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  } finally {
    await client.close();
  }
}

app.get('/backend', async (req, res) => {
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection('users');

    const query = {};
    if (req.query.name) query.name = req.query.name;
    if (req.query.age) query.age = parseInt(req.query.age, 10);

    const users = await collection.find(query).toArray();
    console.log(users);
    res.json(users);
        res.status(200).json({ message: "Success!" });

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectToDB();
});
