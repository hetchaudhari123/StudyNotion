const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const { fileUploader } = require('../utils/uploadFile');
require('dotenv').config();
exports.createSubSection = async (req,res) => {
    try{
        //1 fetch the details
        // console.log("SECTIONID",sectionId);
        const {sectionId,title,description,timeDuration} = req.body;
        const video = req.files.video;
        //2 validation
        // if(!title ||!timeDuration || !desc || !videoFile){
        //     return res.status(400).json({
        //         success:false,
        //         message:"One or more fields are empty"
        //     })
        // }
        if (!sectionId || !title || !description || !video
           
        ) {
            return res
              .status(404)
              .json({ success: false, message: "All Fields are Required" })
          }
          // console.log(video)
        //3 upload to cloudinary 
        // const file = await fileUploader(video,process.env.FOLDER_NAME);
        const file = await fileUploader(video,"StudyNotion");
      // console.log(file)
        //4 insert into the sub-section
        const subSectionDetails = await SubSection.create({
            title,
            timeDuration: `${file.duration}`,
            // timeDuration: `${timeDuration}`,
            description,
            videoUrl:file.secure_url,
        });
        //5 insert the id of the sub-section into the section
        const sectionResponse = await Section.findByIdAndUpdate(sectionId,{$push:{subSection:subSectionDetails._id}},{new:true}).populate('subSection');
        // const courses = await Courses.find(sectionId,{$push:{subSection:subSectionDetails._id}},{new:true}).populate('subSection');
        // console.log(sectionResponse);
        return res.status(200).json({
            success:true,
            message:"Successfully inserted the sub-section",
            data:sectionResponse
        })
    }catch(err){
      console.error("Error creating new sub-section:", err)

        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.updateSubSection = async (req,res) => {
    try{
        //1 fetch the details to be updated
        const {subSectionId,title,description,timeDuration} = req.body;
        // const video = req?.files?.video;
        const subSection = await SubSection.findById(subSectionId);
        if (!subSection) {
            return res.status(404).json({
              success: false,
              message: "SubSection not found",
            })
          }
          if (title !== undefined) {
            subSection.title = title
          }
          if (description !== undefined) {
            subSection.description = description
          }
          if (req?.files && req?.files?.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await fileUploader(
              video,
              // process.env.FOLDER_NAME
              "StudyNotion"
            )
            subSection.videoUrl = uploadDetails.secure_url
            // CHANGE THIS DURING PRODUCTION!!!!!!!!!
            // COMMENT THIS BELOW LINE DURING PRODUCTION
            // subSection.timeDuration = `${uploadDetails.duration}`
            // BELOW LINE ONLY FOR TESTING
            subSection.timeDuration =  uploadDetails.duration;
          }
      
          await subSection.save()
      
          return res.json({
            success: true,
            message: "Sub-Section updated successfully",
          })
    }catch(err){
      console.error(err)
        return res.status(500).json({
            success:false,
            message:"Error occurred while updating the sub-section",
            error:err.message
        })
    }
}

exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
         sectionId,
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }