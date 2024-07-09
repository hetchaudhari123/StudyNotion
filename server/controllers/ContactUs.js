const mailSender = require('../utils/mailSender');
exports.contactUs = async (req,res) => {
    try{
        //1 fetch all the details
        const {firstName,lastName,email,phone,message} = req.body;
        //2 validation
        if(!firstName || !lastName || !email || !phone || !message){
            return res.status(400).json({
                success:false,
                message:"One or more fields are empty"
            });
        }
        //3 send the mails to the author and to the support
        await mailSender(email,'Confirmation','sent your msg');
        await mailSender(process.env.MAIL,'Suggestion',`The msg is ${message}`);
        //4 return the response
        return res.status(200).json({
            success:true,
            message:"Successfully sent the email"
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error occurred while handling the contact us message"
        })
    }
}