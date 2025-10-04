import { useEffect, useState } from 'react'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAverageRating } from '../../../services/operations/profileAPI'
import ReactStars from 'react-stars'
import { FiTrash2 } from 'react-icons/fi'
import CTAButton from "../../core/HomePage/Button"
import { removeCart } from '../../../redux/slices/cartSlice'
import HighlightText from  "../HomePage/HighlightText"
import { buyCourse } from '../../../services/operations/paymentAPI'
import { formatString } from '../../../services/formatString'
import ConfirmationModal from '../../common/ConfirmationModal'
import { resetCart } from '../../../redux/slices/cartSlice'
const Wishlist = () => {
    const { total, totalItems, cart } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.profile)
    const [loading, setLoading] = useState(false)
    const [confirmationModal,setConfirmationModal] = useState(false)
    const [removeCourse,setRemoveCourse] = useState(null)
    const [avgRating,setAvgRating] = useState([])
    const {token} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const fetchAvgRating = async (id) => {
        const res = await fetchAverageRating(id, null, false);
        setAvgRating([...avgRating, res]);
    }

    const buyCourseHandler = async () => {
    const result = await buyCourse({ user, courses: cart },token, setLoading, true)
    if(result) {
        dispatch(resetCart())
    }
    }
    const removeHandler = (course) => {
        setConfirmationModal(true)
        setRemoveCourse(course)
    }
    

    useEffect(() => {
        cart.forEach(ele => {
            fetchAvgRating(ele._id);
        });
    },[]);
    return (
        (confirmationModal)?(
            <div>
                <ConfirmationModal
                text1={'Remove from Cart'}
                text2={`Are you sure you want to remove the course ${removeCourse.courseName} from the cart`}
                onClickBtn1={() => {dispatch(removeCart(removeCourse._id));setConfirmationModal(false)} }
                onClickBtn2={() => setConfirmationModal(false)}
                btn1={'Remove'}
                btn2={'Cancel'}
                customClassBtn2='bg-richblack-700'
                />
            </div>
        ):<div>
            <Header text1={'Wishlist'} text2={'Wishlist'}></Header>
            {

                (totalItems && totalItems > 0) ? (
                    <div className=''>

                        <div className='font-inter text-base font-semibold leading-6 text-left pr-32 pl-6 gap-3 flex text-richblack-400'>

                            {totalItems} {" "}
                            {totalItems === 1 ? "Course " : "Courses "}
                            in Wishlist

                        </div>
                        <div className=' py-6 gap-8 flex flex-col lg:flex-row items-start '>

                            <div className='mx-auto md:mx-0 md:ml-4 gap-8 flex flex-col '>
                                {cart.map((course, index) => {
                                    return (


                                        <div key={index} className='py-4 border border-richblack-700 items-center flex flex-col md:flex-row px-6 gap-5 rounded-lg'>
                                            <div>

                                                <img
                                                    src={`${course.thumbnail}`}
                                                    alt={`${course.courseName + " course image"}`}
                                                    className='object-contain rounded-lg h-[148px] w-[185px]'
                                                />
                                            </div>
                                            <div className="w-full  flex flex-col gap-2.5">
                                                <div className='flex flex-col gap-2.5'>
                                                    <div className='flex flex-col gap-2'>

                                                        <div className='font-inter text-lg font-medium leading-7 text-left text-richblack-5 '>
                                                            {formatString(course.courseDescription,30)}
                                                        </div>


                                                        <div className='text-richblack-300 font-inter text-base font-normal leading-6 text-left'>
                                                            {course.courseName}
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-row gap-2 items-center'>
                                                        {/* Rating */}


                                                        <div className='font-inter text-base font-semibold leading-6 text-left  text-yellow-100'>
                                                            {/* Average Rating */}
                                                            {avgRating ? avgRating[index] : "Loading"}
                                                            {/* {4.5} */}
                                                        </div>
                                                        <div className=''>
                                                            {/* Stars */}
                                                            <ReactStars
                                                                count={5}
                                                                // onChange={ratingChanged}
                                                                size={24}
                                                                color2={'#ffd700'} />
                                                        </div>

                                                        <div className='text-richblack-400 font-inter 
                                                text-base font-normal leading-6 text-left'>
                                                            {/* Review Count */}
                                                            {course.ratingAndReviews.length}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='text-richblack-300 font-inter text-sm font-medium leading-6 text-left flex flex-row'>

                                                    Total Courses • Lesson • Beginner
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-5'>
                                                {/* price */}

                                                <div onClick={() => {removeHandler(course)}} className=' cursor-pointer flex items-center p-3 gap-2 rounded-lg border border-richblack-700 bg-richblack-800
                                                '>
                                                    <div className=' rounded-full  text-pink-200 text-lg'>
                                                        <FiTrash2 />
                                                    </div>


                                                    <div  className='text-pink-200 font-inter text-base font-normal leading-6 text-center'>
                                                        Remove
                                                    </div>
                                                </div>

                                                <div className='font-inter font-semibold leading-8 text-2xl text-left gap-4 flex text-yellow-50'>
                                                    {/* Rs. {1700} */}
                                                    {/* Price of the Course */}
                                                    Rs. {course.price}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                }

                            </div>
                            {/* Fixed (282px) */}
                            {/* <div className='w-[282px] mx-auto lg:mx-0 */}
                            <div className='w-[282px]  mx-auto 
                            
                            
                            '
                            > 
                                <div className='p-6 gap-4 flex flex-col rounded-lg border text-richblack-700 bg-richblack-800'>
                                    <div className='flex flex-col gap-1'>

                                        <div className='font-inter text-sm font-semibold leading-6 text-left text-richblack-200'>Total:</div>

                                        <div className='text-yellow-50 font-inter text-2xl font-semibold leading-8 text-left'>
                                            Rs. {total}
                                        </div>

                                        {/* <div className='text-richblack-300 font-inter line-through text-sm font-normal leading-6 text-left'>
                                    Rs. 3500
                                </div> */}
                                    </div>
                                    <div>
                                        {/* <CTAButton active={true} >

                                            <div className='text-richblack-900 font-inter text-base font-medium leading-6 text-center'>
                                                Buy Now
                                            </div>
                                        </CTAButton> */}
                                         <CTAButton active={true}
                      bgColor='bg-richblack-800'
                      onClick={buyCourseHandler}
                    >

                      <div className='text-richblack-5
                          font-inter text-base font-medium leading-6
                          text-center '>

                        <button
                          // className='bg-white p-4
                          // w-fit h-fit absolute left-1/2 bottom-1/2 '
                          className='text-richblack-900 font-inter text-base font-medium leading-6 text-center'
                        >
                          Buy Now
                        </button>
                      </div>
                    </CTAButton>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                ) :
                    (
                        <div className='flex flex-col gap-4 justify-center items-center h-full '>
                            <div className=''>
                            <HighlightText text={"Nothing here yet!"} customClass={"text-4xl"}></HighlightText>
                            </div>
                            {/* <div className='fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'> */}
                            {/* <div className='w-fit h-fit'>
                            
                                <CTAButton active={true} linkto={'/dashboard/add-course'}>
                                    <div className='text-richblack-900 font-inter text-base font-medium leading-6 text-center '>
                                        Explore Courses
                                    </div>
                                </CTAButton>
                            </div> */}
                        </div>
                    )
            }
        </div>
    )
}

export default Wishlist