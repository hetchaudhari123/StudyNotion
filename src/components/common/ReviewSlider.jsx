
import React, { useEffect, useState } from 'react'
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules'
import { FaAngleRight } from "react-icons/fa6";
import { useRef } from 'react'
import { fetchAllReviews } from '../../services/operations/reviewAPI'
import { formatString } from '../../services/formatString'
import ReactStars from 'react-stars'
// import 'C:/college material/webD/mega/front_end/react-tailwind-css-starter-pack-main (1)/react-tailwind-css-starter-pack-main/node_modules/swiper/swiper-bundle.min.css'
// import '../../../node_modules/swiper/swiper-bundle.min.css'
const ReviewSlider = ({ courses,loading,setLoading,reviews,setReviews }) => {
    const [grabbing, setGrabbing] = useState(false)
  

    const swiperRef = useRef(null);
    const clickHandler = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    return (
        <>{ 
        (
            <div className='flex flex-row items-center '>

                <Swiper
                    ref={swiperRef}
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={24}
             
                    modules={[Autoplay, Pagination, Navigation]}

                    className={`mySwiper ${(!grabbing) ? ("cursor-grab") : ("cursor-grabbing")}`}
                      autoplay={{
                      delay: 1000,
                      disableOnInteraction: true,
                      }}
                    // navigation={true}
                    breakpoints={{
                        1024: { slidesPerView: reviews.length >= 3 ? 3 : reviews.length, }
                    }}

                    onTouchStart={() => { setGrabbing(true) }}
                    onTouchEnd={() => {
                        setGrabbing(false)
                    }}
                >
                    <div>

                        {
                            reviews && reviews.map((review, index) => {

                                return (
                                    <SwiperSlide
                                        className='flex flex-row justify-center
                                        '
                                        key={index}
                                    >
                                        <div
                                            className='
                                    w-[275px] md:w-[350px]
                                    
                                    '
                                        >


                                            <div className='bg-richblack-800
                                                flex flex-col
                                                gap-4
                                                p-4'>
                                                <div className='flex flex-row gap-2 items-center
                                                    '>
                                                    {/* Heading */}

                                                    <img
                                                        src={review.user.image} alt={review.user.firstName + " " + review.user.lastName + " image"}
                                                        className='rounded-[200px] w-[50px] aspect-square
                                                        ' />

                                                    <div className='flex flex-col 
                                                    '>
                                                        <div className='font-inter text-xl 
                                                            
                                                            font-medium  
                                                            tracking-tight
                                                            text-left text-richblack-5'>
                                                            {review.user.firstName + " " + review.user.lastName}
                                                        </div>
                                                        <div className='
                                                            
                                                            font-inter text-md font-medium
                                                             tracking-tight text-left
                                                            text-richblack-400'>
                                                            {review.user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='
                                                text-richblack-5 font-medium text-lg
                                                 w-full h-[100px]
                                                overflow-hidden   '>
                                                    {/* Body */}
                                                    {/* {(review.review)} */}
                                                    {/* {(review.review.split(" ").length > 20) ? review.review.split(" ").slice(0, 20).join(" ") + "..." : review.review} */}
                                                    {formatString(review.review,70)}
                                                </div>
                                                <div className=' flex flex-row items-center
                                                gap-3'>
                                                    {/* Footer */}
                                                    <div className='font-medium text-xl text-yellow-100'>
                                                        {review.rating}
                                                    </div>
                                                    <div>
                                                        {/* Review Stars */}
                                                        <ReactStars
                                                            value={review.rating}
                                                            count={5}
                                                            size={24}
                                                            color2={'#ffd700'}
                                                            edit={false}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                )
                            })

                        }
                    </div>
                </Swiper>

                <div className='bg-[#424854] flex flex-row p-1 gap-1 rounded-[200px]
                items-center h-fit w-fit cursor-pointer'
                    onClick={clickHandler}>
                    <div className='text-richblack-5'>
                        <FaAngleRight />
                    </div>
                </div>
            </div>
            )
}


        </>
    )
}

export default ReviewSlider










/*

                                // return (
                                //     <SwiperSlide
                                //         key={index}

                                //         className='flex flex-row justify-center'
                                //     >
                                //         <div className='
                                //  flex
                                //     flex-col gap-5'>
                                //             <div className='rounded-lg'>
                                //                 <img src={`${review.thumbnail}`}
                                //                     alt={`${course.courseName}`}
                                //                     className='object-contain w-[384px] h-[201px]'
                                //                 />

                                //             </div>
                                //             <div className='gap-2 flex flex-col'>
                                //                 <div className='flex flex-col gap-2'>
                                //                     
                                //                     <div className='text-richblack-5
                                //             font-inter text-base font-medium leading-6
                                //             text-left
                                //             '>
                                //                         {course.courseDescription}
                                //                     </div>

                                //                     <div className='text-richblack-300
                                //             font-inter text-base font-normal leading-6
                                //             text-left'>
                                //                         {course.instructor.firstName + " " + course.instructor.lastName}
                                //                     </div>
                                //                 </div>
                                //                 <div className='flex gap-2
                                //         items-center'>
                                //                

                                //                     <div className='text-yellow-100 
                                //             font-inter text-base
                                //             font-semibold leading-6
                                //             text-left'>
                                //                      
                                //                         {
                                //                             (loading) ? ("Loading") : avgRatingCourse[index]?.avg
                                //                         }
                                //                     </div>
                                //                     <div>
                                //                         {

                                //                             (loading) ? ("Loading") : <RatingStars reviewCount={avgRatingCourse[index]?.review_cnt} />
                                //                         }
                                //                     </div>

                                //                     <div

                                //                         className='text-richblack-400
                                //             font-inter text-base font-normal
                                //             leading-6 text-left'>
                                //                         
                                //                         
                                //                             (loading) ? ("Loading") : avgRatingCourse[index]?.review_cnt}
                                //                     </div>
                                //                 </div>
                                //                 <div>
                                //                   

                                //                     <div className='text-richblack-5
                                //             font-inter text-xl font-semibold leading-7
                                //             text-left'>
                                //                         Rs. {course.price}
                                //                     </div>
                                //                 </div>
                                //             </div>
                                //         </div>
                                //     </SwiperSlide>

                                // )*/