import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";
import ResetPasswordSuccessful from "./pages/ResetPasswordSuccessful";
import VideoPage from "./pages/VideoPage";
import Aboutus from "./pages/Aboutus";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import VideoContent from "./components/core/Video/VideoContent";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Wishlist from "./components/core/Dashboard/Wishlist";
import AddCourses from "./components/core/Dashboard/AddCourses/CourseInformation";
import MyCourses from "./components/core/Dashboard/MyCourses";
import Catalog from "./pages/Catalog";
import BuyCourse from "./pages/BuyCourse";
import { useState } from "react";
import InstructorDashboard from "./components/core/Dashboard/InstructorDashboard/InstructorDashboard";
import ModalNavBar from "./components/common/ModalNavBar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "./utils/constants";
function App() {
  const [navVis, setNavVis] = useState(false)
  const [subLinks, setSubLinks] = useState([]);
  const { user } = useSelector((state) => state.profile)
  return (

    <div className="overflow-y-auto w-screen 
    min-h-screen h-[100%] 
    bg-richblack-900 flex flex-col font-inter ">
      {
        navVis && <ModalNavBar
          navVis={navVis}
          setNavVis={setNavVis}

          setSubLinks={setSubLinks}
          onLinkClick={() => setNavVis(false)}
          subLinks={subLinks}
        ></ModalNavBar>
      }
      <Navbar navVis={navVis} setNavVis={setNavVis}
        subLinks={subLinks} setSubLinks={setSubLinks} />
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

        <Route path="/update-password/:id" element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        }></Route>
        <Route path="/reset-password-successful" element={<ResetPasswordSuccessful />}></Route>
        
        <Route path="/about" element={<Aboutus />}></Route>
        <Route path="view-course" element={<VideoPage />}>
          <Route path=":courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoContent />}>
          </Route>
        </Route>
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route index element={<Navigate to="my-profile" />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="settings" element={<Settings />} />
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="add-course" element={<AddCourses />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="instructor" element={<InstructorDashboard />} />
            </>
          )}
          {/* Route only for Students */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>

              <Route path="enrolled-courses" element={<EnrolledCourses />} />
              <Route path="wishlist" element={<Wishlist />} />

            </>
          )}

        </Route>
        <Route path="course/:courseId" element={<BuyCourse />} />
        <Route path="catalog/:catalogName" element={<Catalog />}></Route>

        <Route path="/*" element={<Error />}></Route>
      </Routes>

    </div>
  )
}

export default App;
