require('dotenv').config()
const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors=require('cors')
const { auth } = require('./middleware/JWTAUTH');
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURL);
const app = express();
app.use(express.json())
app.use(cors(
  {
    origin: process.env.ORGIN,
    credentials: true,
  }
))


const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ORGIN,
    credentials:true
  },
  allowRequest:auth
});
module.exports.io=io

const { chatShare } = require('./Controllers/socket');
io.on("connection", chatShare);

server.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
});

