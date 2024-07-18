import React, { useEffect, useState } from 'react'
import Header from '../components/core/Dashboard/Header'
import { useParams, useSearchParams } from 'react-router-dom'
import { fetchCategory } from '../services/operations/categoryAPI'
import { useDispatch } from 'react-redux'
import Spinner from '../components/common/Spinner'
import { fetchCategoryPageDetails } from '../services/operations/courseAPI'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import Footer from "../components/common/Footer"
import { FaAngleRight } from "react-icons/fa6";
import CourseSliderAdv from '../components/core/Catalog/CourseSliderAdv'
const Catalog = () => {
    const TAGS = {
        MOST_POPULAR: "Most popular",
        NEW: "New", TRENDING: "Trending"
    }
    const catalogName = useParams().catalogName
    const [categories, setCategories] = useState(null)
    // const [categoryId,setCategoryId] = useState(null)
    const [category, setCategory] = useState(null)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [tag, setTag] = useState(TAGS.MOST_POPULAR)
    const [coursesData, setCoursesData] = useState(null)
    useEffect(() => {
        // const fetchCategoryData = async () => {
        //     const result = await fetchCategoryPageDetails({categoryId:category._id},setLoading,true)
        //     setCoursesData(result)
        //     console.log("RESULT...",result)
        // }
        const fetchCat = async () => {
            setLoading(true)
            const resCat = await dispatch(fetchCategory(setCategories, null, false))
            console.log("RESCAT....", resCat)
            const reqCat = resCat?.filter((ele) => ele?.name.replace(/[\s/]+/g, '-').toLowerCase() === catalogName)[0]
            setCategory(reqCat)
            // console.log("REQCAT...",reqCat)
            const result = await fetchCategoryPageDetails({ categoryId: reqCat._id }, setLoading, true)
            console.log("RESULT....", result.data.data)
            setCoursesData(result.data.data)
            console.log("COURSES", result.data.data)
            setLoading(false)
        }
        fetchCat()
    }, [catalogName])
    useEffect(() => {
        if(tag === TAGS.POPULAR){
            setCoursesData()
        }
    },[tag])
    // useEffect(() => {
    //     if(categories){
    //         setCategory(categories?.filter((ele) => ele?.name.replace(/[\s/]+/g, '-').toLowerCase() === catalogName)[0])
    //         setLoading(false)
    //     }
    // },[categories])

    // useEffect(() => {
    //     const fetchCategoryData = async () => {
    //         const result = await fetchCategoryPageDetails({categoryId:category._id},setLoading,true)
    //         setCoursesData(result)
    //         console.log("RESULT...",result)
    //     }
    //     if(category) fetchCategoryData()
    // },[category])

    return (
        <>
            {
                (loading) ? (
                    <div style={{ backgroundColor: 'rgba(189, 189, 189, 0.9)' }} className={`fixed ("opacity-100")  top-0 left-0 bottom-0 right-0 transition-all duration-200`}>
                        <Spinner></Spinner>
                    </div>
                ) : (
                    <div className=''>
                        <div className='bg-richblack-800
                                py-8  md:px-32 gap-6 flex
                                flex-col
                                mx-[2.5rem]
                                md:mx-0
                                 md:flex-row
                                    
                                justify-between '>
                            {/* Header */}
                            <div className='flex flex-col gap-3'>
                                {/* Left */}
                                <div>
                                    {/* Header */}
                                    <div className='flex flex-row gap-2'>

                                        <div className='font-inter text-sm font-normal leading-6 text-left text-richblack-300'>Home</div>
                                        <div className='font-inter text-sm font-normal leading-6 text-left text-richblack-600'>/</div>
                                        <div className='font-inter text-sm font-normal leading-6 text-left text-richblack-300'>Catalog</div>
                                        <div className='font-inter text-sm font-normal leading-6 text-left text-richblack-600'>/</div>
                                        <div className='font-inter text-sm font-medium leading-6 text-left text-yellow-50'>{catalogName}</div>
                                    </div>
                                </div>
                                <div>

                                    {/* Content */}
                                    <div className='text-richblack-5
                                        font-inter text-3xl font-medium leading-10
                                        text-left'>
                                        {category.name}
                                    </div>
                                </div>

                                <div className='text-richblack-200 
                            font-inter text-sm font-normal leading-6 text-left'>
                                    {/* Footer */}
                                    {category.description}

                                </div>
                            </div>


                            <div className='flex flex-col gap-3'>
                                {/* Right */}

                                <div className='text-richblack-5
                            font-inter text-lg font-semibold leading-7 text-left'>
                                    Related Resources
                                </div>
                                <div className='flex flex-col gap-2'>
                                    {/* #AFB2BF */}

                                    <ul className='list-disc text-richblack-100
                            font-inter text-sm font-normal leading-6 text-left'>
                                        <li>
                                            Doc Python
                                        </li>
                                        <li>
                                            Cheatsheets
                                        </li>
                                        <li>
                                            Articles
                                        </li>
                                        <li>
                                            Community Forums
                                        </li>
                                        <li>
                                            Projects
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='
                            flex flex-col gap-y-6 mx-[2.5rem] md:mx-[5rem] xl:mx-[10rem] mt-6'>
                            {/* Body */}
                            {/* <div className=' gap-11 '> */}

                                <div className='flex flex-col gap-10'>
                                    {/* Courses to get you Started */}

                                    <div className='gap-2 flex flex-col'>
                                        {/* Heading */}

                                        <div className='text-richblack-5
                                            font-inter text-3xl font-semibold
                                            leading-10 text-left'>
                                            Courses to get you started
                                        </div>
                                        {/* border-bottom: 1px solid #424854 */}
                                        <div className='border-b border-b-richblack-600
                                            flex gap-1'>




                                            <div className={`transition-all duration-200 cursor-pointer font-inter text-base leading-6   w-fit text-left py-2 px-3 ${(TAGS.MOST_POPULAR !== tag) ? (" text-richblack-200 border-b-0 border-b-transparent font-normal ") : ("  font-medium text-yellow-100 border-b-[1px]  ")}`}
                                                onClick={() => { setTag(TAGS.MOST_POPULAR) }}>
                                                Most popular
                                            </div>
                                            <div className={`transition-all duration-200 cursor-pointer font-inter text-base leading-6   w-fit text-left py-2 px-3 ${(TAGS.NEW !== tag) ? (" text-richblack-200 border-b-0 border-b-transparent font-normal ") : ("  font-medium text-yellow-100 border-b-[1px]  ")}`}
                                                onClick={() => { setTag(TAGS.NEW) }}>
                                                New
                                            </div>
                                            <div className={`transition-all duration-200 cursor-pointer font-inter text-base leading-6   w-fit text-left py-2 px-3 ${(TAGS.TRENDING !== tag) ? (" text-richblack-200 border-b-0 border-b-transparent font-normal ") : ("  font-medium text-yellow-100 border-b-[1px]  ")}`}
                                                onClick={() => { setTag(TAGS.TRENDING) }}>
                                                Trending
                                            </div>

                                        </div>
                                    </div>
                                    <div>
                                        {/* <CourseSlider courses={coursesData?.mostSellingCourses}>

                                        </CourseSlider> */}
                                        <CourseSliderAdv courses={(tag === TAGS.MOST_POPULAR) ? (coursesData?.mostSellingCourses) : ((tag === TAGS.NEW) ? (coursesData?.latestCourses) : (coursesData?.trendingCourses))}>

                                        </CourseSliderAdv>
                                    </div>
                                </div>
                            {/* </div> */}

                            <div className='flex flex-col gap-10'>
                                {/* Top Courses */}

                                <div className='text-richblack-5 
                                font-inter text-3xl font-semibold
                                leading-10 text-left'>
                                    {/* Header */}
                                    Top courses in {category.name}
                                </div>
                                <div>
                                    {/* Content */}
                                    <CourseSliderAdv delay={7000} courses={coursesData?.highestRated}></CourseSliderAdv>
                                </div>
                            </div>
                            <div>
                                {/* Frequently bought together */}

                            </div>


                        </div>
                        <div>
                            <Footer></Footer>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default Catalog