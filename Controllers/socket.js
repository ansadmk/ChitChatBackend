const users = require("../Models/users")
const bcrypt = require("bcrypt")
const validator = require("email-validator");
const messageSchema = require("../Models/messages");
const jwt=require('jsonwebtoken');
const { io } = require("..");

module.exports={
    chatShare:(socket) => {
        socket.on("chat message", async (msg,id) => {
          console.log(msg);
          if (msg) {
            await messageSchema.create({
              userId:id,
              message: msg,
            });
          }
          const msgs = await messageSchema.find().populate('userId')
      
          io.emit("hello", msgs);
        });
      },
   
}