const mongoose = require('mongoose');
const ratingAndReviewSchema = new mongoose.Schema({
    user:{
        ref:"User",
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    course:{
        ref:"Course",
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        index:true
    }
});
module.exports =  mongoose.model("RatingAndReview",ratingAndReviewSchema);