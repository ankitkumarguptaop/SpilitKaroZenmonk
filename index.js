const express = require("express");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./configs/db");
db();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true })); //for file data
app.use("/uploads", express.static("uploads")); // for read static files
app.use("/", require("./routes"));

io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);
  socket.on("ping", (cb) => {
    console.log("ping");
    cb();
  });

  socket.on("join-groups", (group_id) => {
    socket.join(group_id);
    console.log("joined groups room :", socket.id, group_id);
  });

  socket.on("create-expense", (room) => {
    console.log("✌️room --->", room);
    io.to(room).emit("create-expense-notification", "new expense added !");
  });

  socket.on("disconnect", () => {
    console.log(`disconnect ${socket.id}`);
  });
});
const APP_PORT = process.env.APP_PORT || 8080;

server.listen(APP_PORT, () => {
  console.log("server started at ", APP_PORT);
});
