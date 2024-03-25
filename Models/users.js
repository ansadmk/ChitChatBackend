const mongoose=require('mongoose')
const user=mongoose.Schema({
    name:String,
    password:String,
    email:String,
})
module.exports=mongoose.model('user',user)