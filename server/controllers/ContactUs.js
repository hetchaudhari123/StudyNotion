const mailSender = require('../utils/mailSender');
exports.contactUs = async (req,res) => {
    try{
        //1 fetch all the details
        const {firstName,lastName,email,phoneNo,message,countrycode} = req.body;
        console.log("CONTACT US firstName...",firstName)
        console.log("CONTACT US lastName...",lastName)
        console.log("CONTACT US email...",email)
        console.log("CONTACT US phoneNo...",phoneNo)
        console.log("CONTACT US message...",message)
        console.log("CONTACT US countrycode...",countrycode)
        //2 validation
        if(!firstName || !lastName || !email || !phoneNo || !message
    || !countrycode
        ){
            return res.status(400).json({
                success:false,
                message:"One or more fields are empty"
            });
        }
        //3 send the mails to the author and to the support
        await mailSender(email,'Confirmation','sent your msg');
        await mailSender(process.env.MAIL_USER,'Suggestion',`${message}`);
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