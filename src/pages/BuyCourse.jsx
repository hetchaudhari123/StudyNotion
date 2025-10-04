import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner'
import { useState, useEffect } from 'react'
import { FiGlobe } from "react-icons/fi";
import { LuFileCheck } from "react-icons/lu";
import toast from 'react-hot-toast'
import ConfirmationModal from '../components/common/ConfirmationModal'
import { BsCursorFill } from "react-icons/bs";
import { TfiMobile } from "react-icons/tfi";
import { HiTv } from "react-icons/hi2";
import { formatTime } from '../services/formatTime'
import { buyCourse } from '../services/operations/paymentAPI'
import Footer from '../components/common/Footer'
import { fetchCourse } from '../services/operations/courseAPI'
import avgRating from '../services/avgRating'
import RatingStars from '../components/core/Catalog/RatingStars'
import { FiInfo } from "react-icons/fi";
import { formatDate } from '../services/formatDate'
import CTAButton from "../components/core/HomePage/Button"
import Reviews from '../components/common/Reviews'
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { addToCart } from '../redux/slices/cartSlice'
import { ACCOUNT_TYPE } from '../utils/constants'
import { useNavigate, useParams } from 'react-router-dom';

const BuyCourse = () => {
  const { user } = useSelector(state => state.profile)
  const [loading, setLoading] = useState(true)
  const { courseId } = useParams()
  const refBtn = useRef(null)
  const dispatch = useDispatch()
  const { courseDetails } = useSelector(state => state.course)
  const [avgAndCnt, setAvgAndCnt] = useState(null)
  const { token } = useSelector(state => state.auth)
  const [confirmationModal, setConfirmationModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCurCourse = async () => {
      await dispatch(fetchCourse(courseId, token, null, false))
    }
    fetchCurCourse()
  }, [])
  useEffect(() => {
    if (courseDetails) {
      setAvgAndCnt(avgRating(courseDetails))
      setLoading(false)
    }
  }, [courseDetails])
  const clickHandler = async () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    await (buyCourse({ user, courses: [courseId], navigate, navPath: '/dashboard/enrolled-courses' }, token, setLoading, true))
  }
  const collapseHandler = () => {
    setIsActive([])
  }
  const addToCartHandler = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (!token) {
      setConfirmationModal(true)
    }
    dispatch(addToCart({ course: courseDetails }))
  }
  const shareHandler = () => {
    window.navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard')
  }
  // HERO BUTTON FOR RAZORPAY GATEWAY
  // <button 
  //   className='bg-white p-4
  //   w-fit h-fit absolute left-1/2 bottom-1/2 '
  //   ref={refBtn}
  // onClick={clickHandler}>
  //   Pay with Razorpay
  // </button>
  const calcLecture = () => {
    return courseDetails?.courseContent.reduce((prev, section) => {
      return prev + section.subSection.length
    }, 0)
  }
  const [isActive, setIsActive] = useState([])

  const activeHandler = (sectionId) => {
    isActive.includes(sectionId) ? (setIsActive(isActive.filter(ele => ele !== sectionId))) : (setIsActive([...isActive, sectionId]))
  }


  const timeDurationSection = (section) => {
    let seconds = section.subSection.reduce((prev, ss) => {
      return ss.timeDuration + prev
    }, 0)

    return formatTime(seconds)

    // return `${Math.floor(days).toString().padStart(2,"0")}d ${Math.floor(hours).toString().padStart(2,"0")}h ${Math.floor(minutes).toString().padStart(2,"0")}m 
    // ${Math.floor(seconds).toString().padStart(2,"0")}s`
  }
  return (
    (loading) ? (
      <div className='fixed top-0 left-0 bottom-0 right-0'>
        <Spinner />
      </div>
    ) : (confirmationModal) ? (
      <ConfirmationModal
        text1={'Not logged in'}
        text2={'Login to buy the course!'}
        setModal={setConfirmationModal}
        onClickBtn1={() => navigate('/login')}
        onClickBtn2={() => setConfirmationModal(false)}
        btn1={'Login'}
        btn2={'Cancel'}
        customClassBtn2='bg-richblack-700'
      />
    ) : (
      <div>
        {/* <div className='flex flex-col  xl:flex-row 
      justify-center gap-6 
      '> */}
        <div className='flex flex-col  
      justify-center gap-6 
      relative
        '>
          {/* Start */}
          <div className='bg-richblack-700  flex-col gap-6 relative'>

            <div className='relative
                p-8 xl:py-8 xl:px-32 gap-6
                 flex flex-col w-full
                 text-wrap
                xl:max-w-[792px]'>
              {/* Header */}
              <div className=' flex flex-row w-full justify-between
                border border-richblack-700 '>
                <div className='
            
                    gap-3 flex flex-col'>
                  {/* Header Content */}
                  <div className='flex flex-row gap-2 '>

                    <div className='font-inter text-sm font-normal leading-6 text-left text-richblack-300'>Home</div>

                    <div className='font-inter text-sm font-normal leading-6 text-left text-richblack-600'>/</div>
                    <div className='font-inter text-sm font-normal leading-6 text-left text-richblack-300'>Learning</div>
                    <div className='font-inter text-sm font-normal leading-6 text-left text-richblack-600'>/</div>
                    <div className='font-inter text-sm font-medium leading-6 text-left text-yellow-50'>{(courseDetails?.category?.name)}</div>

                  </div>
                  <div className='text-richblack-5
              font-inter text-3xl font-medium
              leading-10 text-left
              
              '>
                    {courseDetails?.courseName}
                  </div>

                  <div className=' font-inter text-sm font-normal
              leading-6 text-left text-richblack-200'>
                    {(courseDetails?.courseDescription)}

                  </div>
                  <div className='gap-2  flex flex-row
            items-center'>

                    <div className='text-yellow-100
              font-inter text-lg font-semibold leading-7 text-left'>
                      {/* Average */}
                      {avgAndCnt.avg}
                    </div>
                    <div>
                      {/* Stars */}
                      <RatingStars reviewCount={avgAndCnt.avg}
                      />
                    </div>

                    <div className='text-richblack-25
              font-inter text-base font-normal leading-6
              text-left'>
                      {/* Rating Number */}
                      ({avgAndCnt.review_cnt + " " + (avgAndCnt.review_cnt === 1 ? "rating" : "ratings")})

                    </div>
                    <div className='text-richblack-25 font-inter
              text-base font-normal leading-6 text-left'>
                      {/* Number of Student enrolled */}
                      {courseDetails?.studentsEnrolled.length + " " + (courseDetails?.studentsEnrolled.length === 1 ? "student" : "students")}
                    </div>
                  </div>

                  <div className='text-richblack-25 font-inter
              text-base font-normal leading-6 text-left
              '>
                    Created by {(courseDetails?.instructor?.firstName
                      + " " +
                      courseDetails?.instructor?.lastName)}
                  </div>
                  {/* 12px */}
                  <div className='gap-3 flex flex-row'>
                    <div className='gap-2 flex flex-row items-center'>
                      <div className='text-richblack-25'>
                        {/* Icon */}
                        <FiInfo />
                      </div>

                      <div className='text-richblack-25
                  font-inter text-base font-normal leading-6 text-left'>
                        {/* Time and Date */}
                        Created at {formatDate(courseDetails?.createdAt)}
                      </div>
                    </div>
                    <div className='gap-2 flex flex-row items-center'>
                      <div className='text-richblack-25'>
                        {/* Icon */}
                        <FiGlobe />
                      </div>

                      <div className='text-richblack-25
                    font-inter text-base font-normal leading-6
                    text-left'>
                        {/* English */}
                        {courseDetails?.language ?? "English"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='h-full
            '>

                </div>
              </div>
            </div>
            <div className='hidden xl:inline-block absolute  text-richblack-700     rounded-lg 
                top-8 right-8 xl:right-32
                border border-richblack-200 h-fit'>
              {/* Course Thumbnail */}
              <div className=' rounded-lg'>
                <img className='text-richblack-25
                    font-inter text-base font-no rmal leading-6
                    text-left object-contain rounded-t-lg
                     w-[384px]'
                  src={courseDetails?.thumbnail} alt={courseDetails?.courseName + " image"} />
                {/* 16px */}
                <div className='flex flex-col gap-4 p-6
                bg-richblack-700 rounded-b-lg'>

                  <div className='text-richblack-5
                      font-inter text-3xl font-bold leading-10 text-left'>
                    Rs. {courseDetails?.price}
                  </div>
                  <div className='gap-3 flex flex-col'>
                    {/* Button */}
                    <CTAButton active={true}
                      onClick={addToCartHandler}>

                      <div className='text-richblack-900
                          font-inter text-base font-medium leading-6
                          text-center'>
                        Add to Cart
                      </div>
                    </CTAButton>
                    <CTAButton active={false}
                      bgColor='bg-richblack-800'
                      onClick={clickHandler}
                    >

                      <div className='text-richblack-5
                          font-inter text-base font-medium leading-6
                          text-center '>

                        <button
                          // className='bg-white p-4
                          // w-fit h-fit absolute left-1/2 bottom-1/2 '
                          ref={refBtn}
                        >
                          Buy Now
                        </button>
                      </div>
                    </CTAButton>
                  </div>

                  <div className='text-richblack-25
                      font-inter text-sm font-normal leading-6 text-center'>
                    {/* Course Includes */}
                    30-Day Money-Back Guarantee
                  </div>

                  <div className='gap-2
                flex flex-col
                      font-inter text-base font-medium leading-6 text-left
                      text-caribbeangreen-100'>
                    {/* Share */}
                    <div className='text-richblack-5'>
                      This course includes:
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                      <FiClock /> <div>8 hours on-demand video</div>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                      <BsCursorFill /> <div>Full Lifetime access</div>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                      <TfiMobile /> <div>Access on Mobile and TV</div>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                      <LuFileCheck /> <div>Certificate of completion</div>
                    </div>
                  </div>

                  <div onClick={shareHandler} className='text-yellow-100 font-inter
                      text-base font-medium leading-6 text-center
                      px-3 py-1 cursor-pointer hover:underline'>
                    Share
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className='
      relative
                p-8 xl:py-8 xl:px-32 gap-6
                 flex flex-col w-full
                 text-wrap
                xl:max-w-[792px]'>


            <div className='border border-richblack-700
            p-8 gap-6 '>
              <div className='flex flex-col gap-3'>

                <div className='text-richblack-5
                  font-inter text-3xl font-medium leading-10 text-left'>
                  What you'll learn
                </div>

                <div className='gap-2 flex flex-col text-richblack-50
                  font-inter text-sm font-medium leading-6 text-left 
                    
                  
                  '>
                  {
                    courseDetails?.whatYouWillLearn.split(".").map((sentence, index) =>

                      <div key={index} className='w-full  '>
                        {sentence}
                      </div>

                    )
                  }
                </div>


              </div>

            </div>
            <div className='flex flex-col gap-4'>
              <div className='w-full flex flex-col gap-2 '>

                <div className='text-richblack-5 font-inter
            text-2xl font-semibold leading-8 text-left'>
                  Course Content
                </div>
                <div className='flex flex-row justify-between'>
                  <ul className='flex flex-row gap-6
                          text-richblack-50 font-inter text-sm
                          font-normal leading-6 text-left
                          list-disc items-center'>
                    <div>

                      {/* {courseDetails.courseContent.length + " " + (courseDetails.courseContent.length === 1) ? ("section") : ("sections")} */}
                      {courseDetails?.courseContent.length + " " + ((courseDetails?.courseContent.length === 1) ? ("section") : ("sections"))}
                    </div>
                    <li>

                      {calcLecture() + " " + (calcLecture() === 1 ? "lecture" : "lectures")}
                    </li>
                    <li>
                      {/* total length */}
                      {/* {totalDuration(courseDetails) + " total length"} */}
                      {formatTime(courseDetails?.courseContent.reduce((previ, section) => {
                        return previ + section.subSection.reduce((prev, ss) => {
                          return prev + Number(ss.timeDuration)
                        }, 0)
                      }, 0)) + " total length"}
                    </li>
                  </ul>

                  <div className='text-yellow-50 font-inter text-sm
                        font-medium leading-6 text-right
                        cursor-pointer'
                    onClick={collapseHandler}>
                    Collapse all sections
                  </div>
                </div>
                <div className='w-full '>
                  {/* Content of the Course */}
                  {
                    courseDetails?.courseContent.map((section) => (
                      <div key={section._id} className='
                 flex flex-col '>

                        <div onClick={() => activeHandler(section._id)}
                          className='flex flex-col'>
                          <div className='w-full border-b border-b-text-richblack-600
                          bg-richblack-700 py-4 px-8 gap-3 flex flex-row items-center
                          justify-between '>

                            <div className='flex flex-row w-full items-center cursor-pointer
                              justify-between ' onClick={() => activeHandler(section._id)}>

                              <div className='flex flex-row items-center gap-1
                          '>
                                <div className='text-richblack-200'>
                                  {(isActive.includes(section._id)) ? <FaAngleUp /> : <FaAngleDown />}
                                </div>

                                <div className='text-richblack-5
                          font-inter text-sm font-medium leading-6 text-left'>
                                  {(section.sectionName)}
                                </div>

                              </div>
                              <div className='flex flex-row items-center gap-3'>

                                <div className='text-yellow-50 font-inter text-sm
                            font-normal leading-6 text-left'>
                                  {section.subSection.length + " " + ((section.subSection.length === 1) ? ("lecture") : ("lectures"))}
                                </div>

                                <div className='text-richblack-25
                              font-inter text-sm font-normal leading-6 text-left'>
                                  {formatTime(section.subSection.reduce((prev, ss) => {
                                    return (prev + Number(ss.timeDuration))
                                  }, 0))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {
                          isActive.includes(section._id) &&
                          section.subSection.map((subSection) => (
                            <div key={subSection._id} className='py-4 px-8 gap-3 flex flex-col'>
                              <div className='gap-3 flex flex-col'>
                                <div className='flex flex-row justify-between'>
                                  <div className='justify-start items-center gap-2 flex flex-row
                                   cursor-pointer' onClick={() => { activeHandler(subSection._id) }}>

                                    <div className='text-richblack-5 font-inter
                                        text-base font-medium leading-6 text-left'>
                                      <HiTv />
                                    </div>
                                    <div className='text-richblack-5 font-inter
                                          text-base font-medium leading-6 text-left '>
                                      {(subSection.title)}
                                    </div>
                                    <div className='text-richblack-200'>
                                      {(isActive.includes(subSection._id)) ? <FaAngleUp /> : <FaAngleDown />}
                                    </div>
                                  </div>

                                  <div className='text-richblack-25
                                  font-inter text-sm font-normal leading-6
                                  text-left
                                  '>
                                    {/* TIME */}
                                    {/* {subSection.timeDuration} */}
                                    {formatTime(Number(subSection.timeDuration))}
                                  </div>
                                </div>

                                {
                                  isActive.includes(subSection._id) &&
                                  <div className='flex flex-row gap-2 px-6
                                  text-richblack-50 font-inter
                                  text-sm font-normal leading-6 text-left'>
                                    {(subSection.description)}
                                  </div>
                                }

                              </div>
                            </div>
                          ))
                        }
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-4'>

              <div className='text-richblack-5
            font-inter text-2xl font-semibold leading-8 text-left'>
                Author
              </div>

              <div className='text-richblack-5 gap-3 flex flex-row
            font-inter text-base font-medium leading-6 text-left
            items-center '>
                {/* 52px */}
                <img className='rounded-[200px] object-contain h-[52px]'
                  src={courseDetails?.instructor?.image} alt={courseDetails?.instructor?.firstName + courseDetails?.instructor?.lastName + "image"} />
                <div>
                  {courseDetails?.instructor?.firstName + " " + courseDetails?.instructor?.lastName}
                </div>
              </div>

              <div className='text-richblack-50 font-inter text-sm font-normal
            leading-6 text-left'>
                {courseDetails?.courseDescription}
              </div>
            </div>
            <div className='   text-richblack-700 rounded-lg 
           
           mx-auto
          border border-richblack-200 h-fit xl:hidden'>
              {/* Course Thumbnail */}
              <div className=' rounded-lg'>
                <img className='text-richblack-25
                    font-inter text-base font-no rmal leading-6
                    text-left object-contain rounded-t-lg
                     w-[384px]'
                  src={courseDetails?.thumbnail} alt={courseDetails?.courseName + " image"} />
                {/* 16px */}
                <div className='flex flex-col gap-4 p-6
              bg-richblack-700 rounded-b-lg'>

                  <div className='text-richblack-5
                      font-inter text-3xl font-bold leading-10 text-left'>
                    Rs. {courseDetails?.price}
                  </div>
                  <div className='gap-3 flex flex-col'>
                    {/* Button */}
                    <CTAButton active={true}
                      onClick={addToCartHandler}>

                      <div className='text-richblack-900
                          font-inter text-base font-medium leading-6
                          text-center'>
                        Add to Cart
                      </div>
                    </CTAButton>
                    <CTAButton active={false}
                      bgColor='bg-richblack-800'
                      onClick={clickHandler}
                    >

                      <div className='text-richblack-5
                          font-inter text-base font-medium leading-6
                          text-center '>

                        <button
                          // className='bg-white p-4
                          // w-fit h-fit absolute left-1/2 bottom-1/2 '
                          ref={refBtn}
                        >
                          Buy Now
                        </button>
                      </div>
                    </CTAButton>
                  </div>

                  <div className='text-richblack-25
                      font-inter text-sm font-normal leading-6 text-center'>
                    {/* Course Includes */}
                    30-Day Money-Back Guarantee
                  </div>

                  <div className='gap-2
                flex flex-col
                      font-inter text-base font-medium leading-6 text-left
                      text-caribbeangreen-100'>
                    {/* Share */}
                    <div className='text-richblack-5'>
                      This course includes:
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                      <FiClock /> <div>8 hours on-demand video</div>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                      <BsCursorFill /> <div>Full Lifetime access</div>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                      <TfiMobile /> <div>Access on Mobile and TV</div>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                      <LuFileCheck /> <div>Certificate of completion</div>
                    </div>
                  </div>

                  <div onClick={shareHandler} className='text-yellow-100 font-inter
                      text-base font-medium leading-6 text-center
                      px-3 py-1 cursor-pointer hover:underline'>
                    Share
                  </div>
                </div>
              </div>

            </div>
          </div>




          {/*Review Slider  */}
          {/* <div className="p-20 flex flex-col gap-20">
                <div className="flex flex-row justify-center text-richblack-5 font-inter text-4xl font-semibold leading-10 tracking-tight text-left w-full  ">
                    Reviews from other learners
                </div>
                <ReviewSlider></ReviewSlider>
            </div> */}
          <Reviews></Reviews>

        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    )
  )
}

export default BuyCourse