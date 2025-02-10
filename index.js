const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./configs/db");
db();

const app = express();



const APP_PORT = process.env.APP_PORT || 8080;

app.listen(APP_PORT, () => {
  console.log("server started at ", APP_PORT);
});
