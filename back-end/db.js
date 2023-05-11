const { MongoClient } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose');
const mongoClient = new MongoClient(process.env.DB_URI);
const db = mongoClient.db('app');
// connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // exit process with failure
    process.exit(1);
  }
};

connectDB();
module.exports = db;
