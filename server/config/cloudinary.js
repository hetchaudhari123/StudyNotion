const cloudinary = require("cloudinary").v2; 
require('dotenv').config();
exports.cloudinaryConnect = () => {
	try {
		cloudinary.config({
			// cloud_name: process.env.CLOUD_NAME,
			cloud_name: "dkqaa1o1w",
			// api_key: process.env.API_KEY,
			api_key: "175297958712149",
			// api_secret: process.env.API_SECRET,
			api_secret: "YHZsawQ8BdBvJGm72WMU5bDyoJY",
		});
	} catch (error) {
		console.log(error);
	}
};