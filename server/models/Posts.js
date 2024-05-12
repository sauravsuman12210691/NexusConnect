const mongoose =require('mongoose');
const {Schema}= mongoose
const postSchema =new Schema({
    user:{
type :mongoose.Schema.Types.ObjectId,
ref:'User'
    },
    imgName:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        // required:true
    },
    likes:{
        type:String,
        default:'General'
    },
    date:{
        type:Date,
        default: Date.now()
    }

})
module.exports= mongoose.model("Post",postSchema);