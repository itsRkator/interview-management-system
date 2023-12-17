const mongoose = require("mongoose");

const connect = async () => {
  try {
    const dbURI = process.env.DB_URI;

    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

module.exports = { connect };
