// const express = require('express');
// const app = express();

// const {cloudinaryConnect} = require('./config/cloudinary');
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const {connect} = require('./config/database');
// const fileUpload = require('express-fileupload');
// const userRoutes = require('./routes/User');
// const contactUsRoutes = require('./routes/Contactus');
// const courseRoutes = require('./routes/Course');
// const paymentsRoutes = require('./routes/Payments');
// const profileRoutes = require('./routes/Profile');
// require('dotenv').config();
// cloudinaryConnect();
// // const PORT = process.env.PORT || 4000;
// const PORT = 4000;
// connect();

// app.use(express.json());
// app.use(cookieParser());



// // Handle preflight requests for all routes (this must come after app.use(cors()))
// // app.use(
// // 	cors({
		
// // 		origin: "https://study-notion2.vercel.app",
// // 		optionsSuccessStatus: 200,
// // 		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// // 		credentials:true,
// // 		allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
// // 	})
// // )
// app.use((req, res, next) => {
//     // res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend URL
//     res.header('Access-Control-Allow-Origin', 'https://study-notion2.vercel.app'); // Replace with your frontend URL
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Credentials', 'true'); // Required for cookies
//     next();
// });
// app.options('*', cors());





// app.use(fileUpload({
//     useTempFiles:true,
// 	tempFileDir:"/tmp",
// }));
// //routes

// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentsRoutes);
// app.use("/api/v1/reach", contactUsRoutes);
// app.get("/", (req, res) => {
// 	return res.json({
// 		success:true,
// 		message:'Your server is up and running....'
// 	});
// });

// app.use((err,req,res,next) => {
// 	res.status(500).json({
// 		success:false,
// 		message:err.stack,
// 	})
// })
// app.listen(PORT, () => {
// 	console.log(`App is running at ${PORT}`)
// })






const express = require('express');
const app = express();

const { cloudinaryConnect } = require('./config/cloudinary');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connect } = require('./config/database');
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

// Configure CORS
app.use(cors({
    origin: 'https://study-notion2.vercel.app',
    // origin: 'http://localhost:3000',
    credentials: true,
}));



// Use CORS middleware
// app.use(cors(corsOptions));

// app.use(
// 	cors({
// 		origin: "*",
// 		credentials: true,
// 	})
// );

// File upload middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp',
}));

// Define routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/payment', paymentsRoutes);
app.use('/api/v1/reach', contactUsRoutes);

// Basic route for health check
app.get('/', (req, res) => {
    return res.json({
        success: true,
        message: 'Your server is up and running....'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err.stack,
    });
});

// Start server
app.listen(PORT, () => {
    // console.log(`App is running at http://localhost:${PORT}`);
	console.log(`App is listening at ${PORT}`);
});
