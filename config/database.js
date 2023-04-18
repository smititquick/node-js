const mongoose = require("mongoose");

const { MONGO_URI } = process.env;
const { MongoClient } = require('mongodb')

// Create Instance of MongoClient for mongodb
const client = new MongoClient('mongodb://localhost:27017')

// Connect to database
client.connect()
    .then(() => console.log('Connected Successfully'))
    .catch(error => console.log('Failed to connect', error))



exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect("mongodb+srv://smile1:smile@cluster0.kdxruqd.mongodb.net/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};