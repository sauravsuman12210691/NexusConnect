const mongoose =require('mongoose');
const {Schema}= mongoose
const userSchema =new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now()
    },
    profileImg:{
        type:String
    }

})
module.exports= mongoose.model("User",userSchema);