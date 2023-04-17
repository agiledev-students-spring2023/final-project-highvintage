const { MongoClient } = require("mongodb");
require("dotenv").config();

const mongoClient = new MongoClient(process.env.DB_URI);
const db = mongoClient.db("app");

module.exports = db;
