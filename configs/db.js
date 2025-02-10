const mongoose = require("mongoose");
const uri = process.env.MONGODB_URL;

async function db() {
  try {
    await mongoose.connect(uri);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = db;
