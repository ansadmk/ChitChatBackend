require('dotenv').config()
const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors=require('cors')
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURL);
const app = express();
app.use(express.json())
app.use(cors(
  {
    origin: "https://chitchat-six-weld.vercel.app",

    credentials: true,
  }
))


const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chitchat-six-weld.vercel.app",
    credentials:true
  },
});
const messageSchema = require("./Models/messages");
const router = require("./routes/auth");

app.use('/api',router)

io.on("connection", (socket) => {
  socket.on("chat message", async (msg) => {
    console.log(msg);
    if (msg) {
      await messageSchema.create({
        message: msg,
      });
    }
    const msgs = await messageSchema.find();

    io.emit("hello", msgs);
  });
});

server.listen(process.env.PORT, () => {
  console.log("server running at http://localhost:8080");
});
