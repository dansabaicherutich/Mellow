require("dotenv").config();

const express = require("express");
const { createServer } = require("http");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const axios = require("axios");
const cors = require("cors");
const User = require("./models/user");
const Messagedet = require("./models/messagedet");
const Privatemessage = require("./models/privatemessages");
const port = 3001;

const app = express();

app.use(express.json());
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("phone", (number) => {
    socket.join(number.phonenumber);

    socket.on("clickednum", (no) => {
      socket.on("newmessage", (msg) => {
        io.to(number.phonenumber).emit("sender", msg.message);
        io.to(no.yy).emit("receiver", msg.message);
      });
    });
  });
});

mongoose.connect("mongodb://localhost:27017/usersdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("database running...");
});
app.get("/getusers", async (req, res) => {
  try {
    const yat = await User.find({});
    res.send(yat);
  } catch (error) {
    console.error(error);
  }
});
app.get("/getgroupchats", async (req, res) => {
  try {
    const chats = await Messagedet.find({});
    res.send(chats);
  } catch (error) {
    console.error(error);
  }
});
app.post("/user", async (req, res) => {
  const phone = req.body.details.phone;
  const user = req.body.details.user;
  const userdetails = new User({
    phonenumber: phone,
    username: user,
  });

  await userdetails.save();
});
app.post("/messagedetails", async (req, res) => {
  const username = req.body.alldet.user;
  const mes = req.body.alldet.message;
  const times = req.body.alldet.timestamp;
  const messagedetails = new Messagedet({
    user: username,
    message: mes,
    timestamp: times,
  });

  await messagedetails.save();
});

app.post("/privatechats", async (req, res) => {
  const author = req.body.toprivatedb.author;
  const acontent = req.body.toprivatedb.acontent;
  const partner = req.body.toprivatedb.partner;
  const pcontent = req.body.toprivatedb.pcontent;
  const time = req.body.toprivatedb.sendtime;
  const privatechat = new Privatemessage({
    author: author,
    acontent: acontent,
    partner: partner,
    pcontent: pcontent,
    time: time,
  });

  await privatechat.save();
});

httpServer.listen(port, () => {
  console.log("server running...");
});
