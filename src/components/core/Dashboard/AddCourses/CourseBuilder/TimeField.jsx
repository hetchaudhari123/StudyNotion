import React from 'react'
import { BiSolidUpArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
const TimeField = ({ time, placeholder, setValue, getValues, register, errors }) => {
    return (
        <div className='flex flex-col gap-1.5'>
            {/* Hours */}

            <div style={{ boxShadow: "0px -1px 0px 0px #FFFFFF2E inset" }}
                className='bg-richblack-600
                                p-3 gap-3 rounded-lg flex flex-row items-center w-full'>

                <div className='w-full'>
                    <input type="text"
                        name={`${time}`}
                        id={`${time}`}
                        {...register(`${time}`, { required: { value: true, message: `Please enter the ${time} component` } })}
                        className='text-richblack-200
                              font-inter w-full 
                              hour
                               focus:outline-none bg-transparent text-base font-medium leading-6 text-left'
                        placeholder={`${placeholder}`}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <div onClick={() => { setValue(`${time}`, Number(getValues(`${time}`) + 1)) }} className='cursor-pointer text-xs'>
                        <BiSolidUpArrow />
                    </div>
                    <div onClick={() => { if (Number(getValues(`${time}`)) > 0) setValue(`${time}`, Number(getValues(`${time}`)) - 1) }} className='cursor-pointer text-xs'>
                        <BiSolidDownArrow />
                    </div>
                </div>
            </div>

            <div className='text-richblack-300 font-inter
                    text-xs font-normal leading-5 text-left'>
                {placeholder}
            </div>
          
        </div>
    )
}

export default TimeField