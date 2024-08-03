const mongoose = require('mongoose');
const Section = require('./Section');
const CourseProgress = require('./CourseProgress');
const RatingAndReview = require('./RatingAndReview');
const Category = require('./Category');
const coursesSchema = new mongoose.Schema({
    courseName:{
        type:String
    },
    courseDescription:{
        type:String
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    price:{
        type:Number
    },
    thumbnail:{
        type:String
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    tag:{
        type:[String],
        required:true
    },
    studentsEnrolled:[
        {
            ref:"User",
            type:mongoose.Schema.Types.ObjectId,
            required:true
        }
    ],
  
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})
// coursesSchema.pre('remove',async (next) => {
//     try{
//         console.log("GETTING REMOVED,THE COURSE.....")
//         await Section.deleteMany({ _id: { $in: this.courseContent } })
//         await RatingAndReview.deleteMany({ _id: { $in: this.ratingAndReviews } })
//         await Category.findByIdAndUpdate(this.category, { $pull: { courses: this._id } });
//         await CourseProgress.deleteMany({ courseID: courseId });
//         next()
//     }catch(err){
//         next(err)
//     }
// })
module.exports =  mongoose.model("Course",coursesSchema);
