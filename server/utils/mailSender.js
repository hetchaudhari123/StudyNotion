// const nodemailer = require('nodemailer');
// require('dotenv').config();
// const mailSender = async (email,title,body) => {
//     try{
//         const transporter =  nodemailer.createTransport({
//             host:process.env.MAIL_HOST,
//             auth:{
//                 user:process.env.MAIL_USER,
//                 pass:process.env.MAIL_PASS
//             }
//         })
//         const info = await transporter.sendMail({
//             from:"StudyNotion",
//             to:email,
//             subject:title,
//             html:body
//         })
//         return info;
//     }catch(err){
//         console.log(err.message);
//         return null
//     }
// }
// module.exports = mailSender;

const nodemailer = require('nodemailer');
require('dotenv').config();

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            // port: 587,              // Explicitly using port 587
            port: 465,              // Explicitly using port 587
            // secure: false,          // Use TLS (STARTTLS) after connection is established
            secure: true,          // Use TLS (STARTTLS) after connection is established
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
            tls: {
                rejectUnauthorized: false // Optional: Accept self-signed certificates (use with caution)
            }
        });

        const info = await transporter.sendMail({
            from: `"StudyNotion" <${process.env.MAIL_USER}>`, // Better to use a proper sender format
            to: email,
            subject: title,
            html: body
        });

        console.log("Email sent:", info.messageId);
        return info;
    } catch (err) {
        console.error("Error sending email:", err.message);
        return null;
    }
}

module.exports = mailSender;
