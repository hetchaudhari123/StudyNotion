import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAverageRating } from '../../../services/operations/profileAPI'
import ReactStars from 'react-stars'
import { FiTrash2 } from 'react-icons/fi'
import CTAButton from "../../core/HomePage/Button"
import { removeCart } from '../../../redux/slices/cartSlice'
import HighlightText from  "../HomePage/HighlightText"
const Wishlist = () => {
    const { total, totalItems, cart } = useSelector(state => state.cart);
    console.log(total);
    console.log(totalItems);
    console.log(cart);
    const avgRating = [];
    const dispatch = useDispatch();
    const fetchAvgRating = async (id) => {
        const res = await fetchAverageRating(id, null, false);
        avgRating.push(res);
    }
    const removeFromCart = (courseid) => {
        dispatch(removeCart(courseid));
    }
    // UNCOMMENT THIS TO GET THE DATA
    // useEffect(() => {
    //     cart.forEach(ele => {
    //         fetchAvgRating(ele._id);
    //     });
    // },[]);
    return (
        <div>
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


                                        <div key={index} className='py-4 border border-richblack-700 flex flex-col md:flex-row px-6 gap-5 rounded-lg'>
                                            <div>

                                                <img
                                                    src={`${course.thumbnail}`}
                                                    alt={`${course.courseName + " course image"}`}
                                                    className='object-cover rounded-lg h-[148px] w-[185px]'
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2.5">
                                                <div className='flex flex-col gap-2.5'>
                                                    <div className='flex flex-col gap-2'>

                                                        <div className='font-inter text-lg font-medium leading-7 text-left text-richblack-5 '>
                                                            {course.courseDescription}
                                                        </div>


                                                        <div className='text-richblack-300 font-inter text-base font-normal leading-6 text-left'>
                                                            {course.courseName}
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-row gap-2 items-center'>
                                                        {/* Rating */}


                                                        <div className='font-inter text-base font-semibold leading-6 text-left  text-yellow-100'>
                                                            {/* Average Rating */}
                                                            {/* {avgRating[index]} */}
                                                            {4.5}
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
                                                            (Review Count)
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='text-richblack-300 font-inter text-sm font-medium leading-6 text-left flex flex-row'>

                                                    Total Courses • Lesson • Beginner
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-5'>
                                                {/* price */}

                                                <div className='cursor-pointer flex items-center p-3 gap-2 rounded-lg border border-richblack-700 bg-richblack-800'>
                                                    <div className=' rounded-full  text-pink-200 text-lg'>
                                                        <FiTrash2 />
                                                    </div>


                                                    <div onClick={() => removeFromCart(course._id)} className='text-pink-200 font-inter text-base font-normal leading-6 text-center'>
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
                            <div className='w-[282px] mx-auto lg:mx-0'>
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
                                        <CTAButton active={true} >

                                            <div className='text-richblack-900 font-inter text-base font-medium leading-6 text-center'>
                                                Buy Now
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
                            <div className='w-fit h-fit'>
                            
                                <CTAButton active={true} linkto={'/dashboard/add-course'}>
                                    <div className='text-richblack-900 font-inter text-base font-medium leading-6 text-center '>
                                        Explore Courses
                                    </div>
                                </CTAButton>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default Wishlist