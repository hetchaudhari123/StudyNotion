const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require('../mail/templates/emailVerificationTemplate')
const OTPSchema = new mongoose.Schema({
   email:{
    type:String,
    required:true
   },
   otp:{
    type:String,
    required:true
   },
   createdAt:{
    type:Date,
    default:Date.now(),
    expires:5*60
   }
});

async function sendVerificationCode(email,otp){
    try{
        const mailResponse = await mailSender(email,`Verification email from StudyNotion`,emailTemplate(otp));
        console.log("Email sent successfully:",mailResponse.response);
    }catch(err){
        console.log("Error occurred while sending the verification email",err);
        throw err;
    }
}
OTPSchema.pre("save",async function(next){
    console.log("New document saved to database");
   
	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationCode(this.email, this.otp);
	}
    next();
});
module.exports =  mongoose.model("OTP",OTPSchema);
