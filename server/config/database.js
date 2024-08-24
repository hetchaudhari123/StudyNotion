const mongoose = require('mongoose');
require('dotenv').config();
exports.connect = () =>{
    // mongoose.connect(process.env.MONGODB_URL)
    mongoose.connect("mongodb+srv://22bce046:IEyyon6xYAGDJdwj@cluster0.wx6vags.mongodb.net/StudyNotionDB")
    .then(()=>{console.log("DB Connected Successfully")})
    .catch((err)=>{
        console.log("DB Connection Failed");
        console.error(err);
        process.exit(1);
    })
};