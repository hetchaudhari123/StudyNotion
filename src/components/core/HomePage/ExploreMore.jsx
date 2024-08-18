import React, { useDebugValue, useState } from 'react'
import { HomePageExplore } from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';
const tabs = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths",
];
export default function ExploreMore() {
    const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [selectedCourse, setSelectedCourse] = useState(HomePageExplore[0].courses[0]);
    const selectTab = (tab) => {
        setCurrentTab(tab);
        const obj = HomePageExplore.filter(ele => ele.tag === tab);
        setCourses(obj[0].courses);
        setSelectedCourse(obj[0].courses[0]);
    }
    return (

        <div className='relative flex flex-col '>
            <div className='relative'>
                <div className='flex flex-col gap-2 items-center'>
                    <div className='font-inter text-4xl font-semibold leading-10 tracking-tight text-left xl:text-center text-richblack-5'>
                        Unlock The
                        <HighlightText text={"Power of Code"}>
                        </HighlightText>
                    </div>
                    <div className='font-inter text-base font-medium leading-6 text-center text-richblack-300'>
                        Learn to Build Anything You Can Imagine
                    </div>
                </div>
                <div className='flex justify-center '>
                    {/* xl:flex  -mt-5  w-max  drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]  */}
                    <div className='mx-auto flex flex-col xl:flex-row py-1 px-5 text-richblack-200 bg-richblack-800 rounded-lg  font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] gap-2 xl:gap-5 mt-5 mb-5 '>
                        {
                            tabs.map((ele, index) => {
                                return (
                                    <div className={`flex items-center justify-center cursor-pointer text-center ${currentTab === ele ? "bg-richblack-900 text-richblack-5 " : "text-richblack-200"} transition-all duration-200 hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2 rounded-full`} key={index} onClick={() => { selectTab(ele) }}>
                                        {ele}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
            <div className=" xl:block xl:h-[200px]"></div>
            <div className=' xl:flex-row xl:absolute xl:bottom-0 xl:translate-y-[50%] flex flex-col justify-between  items-center gap-9 pt-8 pr-14 pb-0 pl-14'>
                <CourseCard courses={courses} setSelectedCourse={setSelectedCourse} selectedCourse={selectedCourse} />
            </div>
        </div>

    )
}
