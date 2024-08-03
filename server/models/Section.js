const mongoose = require('mongoose');
const SubSection = require('./SubSection');
const Course = require('./Course')
const sectionSchema = new mongoose.Schema({
    sectionName:{
        type:String
    },
    subSection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSection",
            required:true
        }
    ]
})
// sectionSchema.pre('remove',async (next) => {
//     try{
//         await SubSection.deleteMany({_id:{$in:this.subSection}})
//         // await Course.findOneAndUpdate({},{})
//         // await Course.findByIdAndUpdate(courseId,
//         //     {
//         //         $pull:{
//         //             courseContent:sectionId
//         //        }
//         // }
//         // );
//         next()
//     }catch(err){
//         next(err)
//     }
// })
module.exports =  mongoose.model("Section",sectionSchema);