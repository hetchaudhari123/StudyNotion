import React from 'react'
import CTAButton from "../../core/HomePage/Button"
import { FiEdit } from "react-icons/fi";
const EditBtn = () => {

  return (
    <CTAButton linkto={"/dashboard/settings"} active={true}>
    <div className=' justify-between  flex flex-row items-center gap-2'>
      <FiEdit />
      <div className=' flex font-inter text-base font-medium leading-6 text-center text-richblack-900'>
        Edit
      </div>
    </div>
  </CTAButton>
  )
}

export default EditBtn