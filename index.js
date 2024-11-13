// index.js
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;;

// MongoDB connection URI and Database Name
const uri = 'mongodb://localhost:27017/users'; // Replace with your MongoDB URI
const dbName = 'users'; // Replace with your database name
const client = new MongoClient(uri);

// Use CORS to allow requests from the frontend
app.use(cors());
async function connectToDB() {
    try {
        await client.connect();
        console.log("Connected to the database successfully!");
        const database = client.db("users"); // Access the database
    
        // Example: Fetch a collection
        const collection = database.collection("users");
        const users = await collection.find({}).toArray();
        console.log("Users Fetched Successfully !");
      } catch (err) {
        console.error("Error connecting to the database:", err);
      } finally {
        await client.close(); // Close the connection after operations
      }
  }
  
  // Endpoint to fetch users based on dynamic query parameters
  app.get('/backend', async (req, res) => {
    try {
      await client.connect();
      const database = client.db(dbName);
      const collection = database.collection('users');
  
      // Build a dynamic query based on request query parameters
      if (req.query.name) query.name = req.query.name;
      if (req.query.age) query.age = parseInt(req.query.age, 10);
      // Fetch matching documents
      const users = await collection.find({}).toArray();
      console.log(users);
      res.json(users);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    connectToDB(); // Call the function to connect to MongoDB
  });

// ----------------------------------------------------------------------------------------------------------------------------
// Sample data route
// app.get('/backendData', (req, res) => {
//   const data = { message: 'Hello from the backend!' };
//   res.json(data);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// --------------------------------------------------------------------

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });

