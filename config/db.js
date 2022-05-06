const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const ConnectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
module.exports = ConnectDB;
