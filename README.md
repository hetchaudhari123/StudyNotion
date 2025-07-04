
# 📘 StudyNotion

A fully functional **ed-tech platform** that enables users to create, consume, and rate educational content. Built with the **MERN stack**, StudyNotion supports user authentication, course creation, video lectures, payment integration, and more.

----------

## 🚀 Live Demo

[StudyNotion](https://study-notion2.vercel.app/)

----------

## 🖼️ Screenshots

### 🏠 Home Page

![Home Page](/assets/homepage.png)

### 📚 Dashboard

![Dashboard](/assets/dashboard.png)

### 📖 Courses Page

This page displays all available courses for users. Each course shows its title, description, and preview image. Users can browse and enroll from here. ![Courses Page](/assets/courses.png)

----------

## 🧠 Features

-   🔐 User authentication (login/signup with JWT)
-   🧑‍🏫 Instructor and student dashboards
-   🎓 Course creation and enrollment
-   🎥 Video lectures and module organization
-   💳 Payment integration with Razorpay
-   📊 Progress tracking for enrolled users
-   📱 Fully responsive UI

----------

## 🛠️ Tech Stack

**Frontend:**

-   ReactJS
-   Tailwind CSS
-   Redux Toolkit

**Backend:**

-   Node.js
-   Express.js
-   MongoDB
-   Cloudinary (for image uploads)

**Other Integrations:**

-   Razorpay (for payments)
-   JWT (authentication)
-   Mongoose (ORM)
-   dotenv, nodemailer, bcrypt, etc.

----------

## ⚙️ Installation (Local Setup)

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/hetchaudhari123/StudyNotion2.git

```

### 2. Install Dependencies

Navigate into the project directories and install the required packages:

```bash
# Install frontend dependencies
cd src
npm install

# Install backend dependencies
cd ../server
npm install

```

### 3. Environment Variables Setup

#### Backend Environment Variables

Create a `.env` file inside the `/server` directory with the following environment variables:

```env
# 🌩️ Cloudinary
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
CLOUD_NAME=your_cloudinary_cloud_name
FOLDERNAME=your_cloudinary_folder_name

# 🔐 JWT
JWT_SECRET=your_jwt_secret_key

# 📧 Nodemailer (for sending emails)
MAIL_HOST=your_mail_host
MAIL_PASS=your_mail_password
MAIL_USER=your_mail_username

# 🌐 MongoDB
MONGODB_URL=your_mongodb_connection_url

# 🚀 Backend Server
PORT=4000

# 💳 Razorpay
RAZORPAY_KEY=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret_key

# 🌐 React App Environment (used in the client)
REACT_APP_BASE_URL=http://localhost:4000
REACT_APP_RAZORPAY_KEY=your_razorpay_key
REACT_APP_RAZORPAY_SECRET=your_razorpay_secret_key

```

#### Frontend Environment Variables

Create a `.env` file in the **root folder** (frontend directory) containing:

```env
REACT_APP_KEY_OF_RAZOR=your_razorpay_key

```

### 4. Run the Application

Start the development server:

```bash
npm run dev

```

The application will be available at `http://localhost:3000` (frontend) and `http://localhost:4000` (backend).

----------

## 📝 Additional Notes

-   Make sure MongoDB is running on your system or use a cloud MongoDB service
-   Obtain API keys from Cloudinary and Razorpay for full functionality
-   Configure your email service for nodemailer integration
-   All environment variables are required for the application to function properly

----------

## 🤝 Contributing

Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

----------

## 📄 License

This project is open source and available under the [MIT License](https://claude.ai/chat/LICENSE).
