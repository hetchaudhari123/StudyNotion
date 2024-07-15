import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";
import { COURSE_STATUS } from '../../../../../utils/constants';
import Spinner from '../../../../common/Spinner';
import { updateCourse } from '../../../../../services/operations/courseAPI';
import { useNavigate } from 'react-router-dom';

const PublishCourse = ({name}) => {
  // border: 1px solid #2C333F
  const {
    register,
    errors,
    handleSubmit,
    setValue
  } = useForm()
  const [checked,setChecked] = useState(false)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const clickHandler = () => {
    setChecked(prev => !prev)
  }
  const submitHandler = async () => {
    const result = await updateCourse({status:checked ? 
      COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT},setLoading,true)
    navigate('/dashboard/my-courses')
  }
  useEffect(() => {
    setValue(name,checked)
  },[checked])
  return (
    (loading) ? (
      <div className='border-2 border-white absolute top-0 left-0
      bottom-0 right-0'>
        <Spinner/>
      </div>
    ):
    <div className='border border-richblack-700
    bg-richblack-800 p-6 gap-7 rounded-lg 
    flex flex-col'>

        <div className='text-richblack-5
        font-inter text-2xl font-semibold leading-8 text-left'>
        Publish Settings
        </div>
     
        <div className='flex flex-row gap-2
        '>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className='text-richblack-400
        font-inter flex flex-row items-center
        text-base gap-2 font-medium leading-6 text-left'>

            <div className='flex flex-row justify-center '>
              {/* <div className='flex p-2.5 gap-2.5
              border border-richblack-500
              rounded-md'> */}
              <div className='text-[20px] cursor-pointer'
              onClick={clickHandler}>
              {checked ? <ImCheckboxUnchecked/> : <ImCheckboxChecked/>}
              </div>

              {/* </div> */}
                <input 
                type="checkbox" 
                name='box'
                id='box'
                {...register('box',{
                })}
                className="hidden"
                />

            </div>

            <div>

                <label className='text-richblack-400' htmlFor="box">
                Make this Course Public
                </label>

            </div>
            </div>

          </form>
        </div>
    </div>
  )
}

export default PublishCourse