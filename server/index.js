const express = require('express');
const app = express();
const {cloudinaryConnect} = require('./config/cloudinary');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {connect} = require('./config/database');
const fileUpload = require('express-fileupload');
const userRoutes = require('./routes/User');
const contactUsRoutes = require('./routes/Contactus');
const courseRoutes = require('./routes/Course');
const paymentsRoutes = require('./routes/Payments');
const profileRoutes = require('./routes/Profile');
require('dotenv').config();
cloudinaryConnect();
const PORT = process.env.PORT || 4000;
connect();
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)
app.use(fileUpload({
    useTempFiles:true,
	tempFileDir:"/tmp",
}));
//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentsRoutes);
app.use("/api/v1/contactus", contactUsRoutes);
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});
app.use((err,req,res,next) => {
	res.status(500).json({
		success:false,
		message:err.stack,
	})
})
app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})