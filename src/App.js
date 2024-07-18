import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import ResetPasswordSuccessful from "./pages/ResetPasswordSuccessful";
import VerifyEmail from "./pages/VerifyEmail";
import Aboutus from "./pages/Aboutus";
import Contactus from "./pages/Contactus";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Wishlist from "./components/core/Dashboard/Wishlist";
import AddCourses from "./components/core/Dashboard/AddCourses/CourseInformation";
import MyCourses from "./components/core/Dashboard/MyCourses";
import Catalog from "./pages/Catalog";
import CourseSliderPrac from "./components/core/Catalog/CourseSliderPrac";
import Sidebar from "./components/common/Sidebar";
import SidebarRef from "./components/common/SidebarRef";
function App() {
  return (
    <div className="overflow-y-auto w-screen 
    min-h-screen h-[100%] 
    bg-richblack-900 flex flex-col font-inter ">
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        }></Route>
        <Route path="/signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        }></Route>
        <Route path="/forgot-password" element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        }></Route>
        <Route path="/update-password/:id" element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        }></Route>
        <Route path="/reset-password-successful" element={<ResetPasswordSuccessful />}></Route>
        <Route path="/verify-email" element={<VerifyEmail />}></Route>
        <Route path="/about" element={<Aboutus />}></Route>
        <Route path="/contact" element={<Contactus />}></Route>
        {/* <Route path="/dashboard/my-profile" element={<Dashboard />}></Route> */}
        {/* <Route path="/dashboard/" element={<Dashboard/>}> */}
        {/* <Route path="/my-profile" element={<MyProfile/>}></Route> */}
        {/* </Route>
         */}
        {/* <Route path="/dashboard/my-profile" element={<Dashboard />} /> */}

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
          }>
        <Route path="my-profile" element={<MyProfile/>}/>
        <Route path="settings" element={<Settings/>}/>
        <Route path="enrolled-courses" element={<EnrolledCourses/>}/>
        <Route path="wishlist" element={<Wishlist/>}/>
        <Route path="add-course" element={<AddCourses/>}/>
        <Route path="my-courses" element={<MyCourses/>}/>
        </Route>
        {/* http://localhost:3000/catalog/ai-ml */}
        <Route path="catalog/:catalogName" element={<Catalog/>}></Route>
        {/* <Route path="swiper" element={<CourseSliderPrac/>}></Route> */}
        {/* <Route path="side-bar-ref" element={<SidebarRef/>}></Route> */}
        {/* <Route path="side-bar" element={<Sidebar/>}></Route> */}
        <Route path="/*" element={<Error />}></Route>
      </Routes>
    </div>
  )
}

export default App;
