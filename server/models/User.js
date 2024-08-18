const mongoose = require('mongoose');
const Profile = require('./Profile');
const RatingAndReview = require('./RatingAndReview');
const Course = require('./Course');
const CourseProgress = require('./CourseProgress');
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true
    },
    active:{
        type:Boolean,
        default:true
    },
    approved:{
        type:Boolean,
        default:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        }
    ],
    image:{
        type:String,
        required:true
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgess",
        }
    ],
    token :{
        type:String,
    },
    resetPasswordExpires: {
        type:Date,
    },
    
}
,
{ timestamps: true });

// userSchema.pre('remove',async (next) => {
//     try{
//         await Profile.deleteMany({id:{$in:this.additionalDetails}})
//         await RatingAndReview.deleteMany({user:this._id})
//         await Course.deleteMany({_id:{$in:this.courses}})
//         await CourseProgress.deleteMany({_id:{$in:this.courseProgress}})
//         next()
//     }catch(err){
//         next(err)
//     }
// })
module.exports =  mongoose.model("User",userSchema)
