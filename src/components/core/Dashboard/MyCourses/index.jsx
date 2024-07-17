import React from 'react'
import Header from "../Header"
import CTAButton from "../../HomePage/Button"
import { CiBookmarkPlus } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import TableCourses from './TableCourses';
const MyCourses = () => {
  const navigate = useNavigate()
  return (
    <div>
      {/* 24px, 120px, 24px, 24px */}
      <div className='flex flex-row  items-start
       gap-6
      py-6 pr-32 pl-6'>
        <Header customClass={" py-0 px-0"} text1={"Courses"} text2={"My Course"}
        ></Header>
        <div className='flex justify-end h-fit'>
          <CTAButton active={true}
            onClick={() => {
              navigate('/dashboard/add-course')
            }}>
            <div className='flex flex-row items-center
          justify-center gap-2'>
              <div className='text-richblack-900 text-2xl
            '>
                <CiBookmarkPlus />
              </div>

              <div className='text-richblack-900
            font-inter text-base font-medium leading-6 text-center'>
                New
              </div>
            </div>
          </CTAButton>
        </div>
      </div>
      <div className='mx-4'>
        <TableCourses />
      </div>
    </div>
  )
}

export default MyCourses