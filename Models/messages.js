const mongoose=require('mongoose')
const messageSchema=mongoose.Schema({
    userId:{type:mongoose.SchemaTypes.ObjectId,ref:'user'},
    message:String

},{ timestamps: true })
module.exports=mongoose.model('messages',messageSchema)