const nodemailer = require('nodemailer');
require('dotenv').config();
const mailSender = async (email,title,body) => {
    try{
        const transporter =  nodemailer.createTransport({
            // host:process.env.MAIL_HOST,
            host:smtp.gmail.com,
            auth:{
                user:process.env.MAIL_USER,
                // user:"hetc18072004@gmail.com",
                pass:process.env.MAIL_PASS
                // pass:"iyni eiqd tyfb scod"
            }
        })
        const info = await transporter.sendMail({
            from:"StudyNotion",
            to:email,
            subject:title,
            html:body
        })
        return info;
    }catch(err){
        console.log(err.message);
        return null
    }
}
module.exports = mailSender;