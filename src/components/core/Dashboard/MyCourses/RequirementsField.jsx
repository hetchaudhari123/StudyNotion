import React, { useState } from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";

const RequirementsField = ({ register, setValue, errors, reqList, setReqList, getValues }) => {
  const addHandler = () => {
    if (!reqList.includes(getValues('requirement'))) {
      setReqList([...reqList, getValues('requirement')])
    }
    setValue('requirement', '');
  }
  console.log('REQLIST.......', reqList);
  return (
    <div className='flex flex-col gap-1.5'>

      <div className='flex flex-row items-center gap-0.5 font-inter text-sm font-normal leading-6 text-left'>
        <div className='text-richblack-5'>
          Requirements/Instructions
        </div>
        <div className='text-pink-200'>
          *
        </div>
      </div>

      <div style={{ boxShadow: "0px -1px 0px 0px #FFFFFF2E inset" }}
        className='bg-richblack-700 p-3 flex gap-3 rounded-lg'>
        {/* input */}
        <input
          type="text"
          {...register("requirement", { required: { value: true, message: "Please enter the requirements of the course." } })}
          placeholder='Enter the requirements of the course'

          className='w-full focus:outline-none text-richblack-200 bg-transparent font-inter text-base font-medium leading-6
        text-left' />
      </div>
      {
        errors.requirement &&
        (<div className='text-richblack-5'>
          {errors.requirement.message}
        </div>)

      }

      <div
        onClick={addHandler}
        className='cursor-pointer text-yellow-100 font-inter text-base font-bold leading-6
       text-left'>
        Add
      </div>

      <div className='flex flex-row gap-4 px-4 py-2 flex-wrap'>

        {
          reqList.map((ele, index) => (
            <div key={index} className='bg-yellow-400 rounded-[200px] px-4 py-0.5 gap-2 w-fit flex flex-row items-center justify-center'>
              <div className='text-richblack-5 font-medium'>
                {ele}
              </div>
              <div onClick={() => { setReqList(reqList.filter((cur) => cur !== ele)) }} className='cursor-pointer'>
                <IoMdCloseCircleOutline />
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default RequirementsField