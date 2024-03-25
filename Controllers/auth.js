const users = require("../Models/users")
const bcrypt = require("bcrypt")
const validator = require("email-validator");
const messages = require("../Models/messages");
const jwt=require('jsonwebtoken')
module.exports={
    register:async (req,res)=>{
        const {username,password,email}=req.body
        console.log(req.body);
        const saltRounds=10
        const salt = await bcrypt.genSalt(saltRounds);
        
           await users.create({
             password: await bcrypt.hash(password,salt),
              name:username,
              email:email
           })
           res.json({
            status:"success",
            
           })
       
    },
    login:async (req,res)=>{
        const {password,email}=req.body
        console.log(req.body);
        
        const userDetail=await users.findOne({email:email})
        const verified=await bcrypt.compare(password,userDetail.password)
        console.log(verified);
       if (verified) {
          const token= jwt.sign({id:userDetail._id},process.env.SECRET_TOKEN)
          res.cookie('authcookie',token)
           res.json({
            status:"success",
            jwt:token
           })


       }else{
        res.json({
            status:"failure",
            message:"email does not exist"
           })
       }
    }

}