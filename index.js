const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./configs/db");
db();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false })); //for file data
app.use("/uploads", express.static("uploads")); // for read static files
app.use("/", require("./routes"));

const APP_PORT = process.env.APP_PORT || 8080;

app.listen(APP_PORT, () => {
  console.log("server started at ", APP_PORT);
});
