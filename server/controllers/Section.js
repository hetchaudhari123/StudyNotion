const Section = require('../models/Section');
const Course = require('../models/Course');
const SubSection = require('../models/SubSection');
exports.createSection = async (req,res) => {
    try{
        //1 fetch the details
        const {sectionName,courseId} = req.body;
        //2 validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"One or more fields are empty"
            });
        }
        //3 create the section
        const section = await Section.create({sectionName});
        //4 insert the section into the course
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{$push:{courseContent:section._id}},{new:true}).populate({
            path:'courseContent',
            populate:{
                path:'subSection'
            }
        });
        //5 return the res
        return res.status(200).json({
            success:true,
            message:"Successfully created the section",
            updatedCourse
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.updateSection = async (req,res) => {
    try{
        //1 fetch the details
        const {sectionName,sectionId} = req.body;
        //2 validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"One or more properties missing"
            })
        }
        //3 update the name
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        //4 return the response
        return res.status(200).json({
            success:true,
            message:"Successfully updated the section",
            section
        })
    }catch(err){
		console.error("Error updating section:", err);

        return res.status(500).json({
            success:false,
            message:"Error occurred while updating the section",
        })
    }
}
exports.deleteSection = async (req,res) => {
    try{
        //1 fetch the id from the params
        // const {sectionId,courseId} = req.params;
        // console.log("REQ.PARAMS.......",req.body);
        const {courseId,sectionId} = req.body;
        
        // const {sectionId,courseId} = req.body;
        //2 validation
        if(!sectionId || !courseId){
            // console.log(req.params);
            console.log(sectionId);
            console.log(courseId);
            // console.log(req.params);
            return res.status(400).json({
                success:false,
                message:"One or more fields are missing"
            })
        }
        //3 TODO : delete from the course
        const courseResponse = await Course.findByIdAndUpdate(courseId,
            {
                $pull:{
                    courseContent:sectionId
               }
        }
        );
        //4 delete from the Section collection
        const section = await Section.findById(sectionId);
        await SubSection.deleteMany({_id:{$in:section.subSection}})
        const response = await section.deleteOne()
        


        // console.log(courseResponse);
        //5 return the response
        return res.status(200).json({
            success:true,
            message:"Successfully deleted the section"
        })
    }catch(err){
		console.error("Error deleting section:", err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}