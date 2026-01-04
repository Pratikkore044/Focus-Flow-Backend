const mongoose = require('mongoose');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const { connect } = require('../todo/route');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });



async function connectToDb () {
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;

if (!username || !password) {
    throw new Error('DB_USERNAME and DB_PASSWORD must be defined in environment variables');
  }

    const uri = `mongodb+srv://${username}:${password}@cluster01.mcjcw.mongodb.net/todo_backend?appName=Cluster01`;
  try {
    await mongoose.connect(uri);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (e) {
   console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);

  }
}

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

module.exports = { connectToDb};