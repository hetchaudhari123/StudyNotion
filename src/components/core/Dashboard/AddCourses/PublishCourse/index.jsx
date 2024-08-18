import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";
import { COURSE_STATUS } from '../../../../../utils/constants';
import Spinner from '../../../../common/Spinner';
import { updateCourse } from '../../../../../services/operations/courseAPI';
import { useNavigate } from 'react-router-dom';
import CTAButton from "../../../HomePage/Button"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { resetCourse, setCourseDetails, setEditCourse, setStep } from '../../../../../redux/slices/courseSlice';
import toast from 'react-hot-toast';
const PublishCourse = () => {
  // border: 1px solid #2C333F
  const {
    register,
    errors,
    handleSubmit,
    getValues,
    setValue
  } = useForm()
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const { courseDetails } = useSelector(state => state.course)
  // console.log("COURSE DETAILS....",courseDetails)
  const navigate = useNavigate()
  const clickHandler = () => {
    setChecked(prev => !prev)
    document.getElementById('box').click()
  }
  useEffect(() => {
    // console.log("COURSE DETAILS....",courseDetails?.status)
     if(courseDetails?.status === COURSE_STATUS.PUBLISHED){
      setChecked(true)
     }
  },[courseDetails])
  const submitHandler = async () => {

    if(!((courseDetails.status === COURSE_STATUS.DRAFT && !checked ) || 
      (courseDetails.status === COURSE_STATUS.PUBLISHED && checked))){
        
    const result = await updateCourse({
      status: ((checked) ?
        COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT),
      courseDetails,
      dispatch
    }, setLoading, true)
    if (result){
      dispatch(resetCourse())
      navigate('/dashboard/my-courses')
    }
  }
      else{
        dispatch(resetCourse())
        navigate('/dashboard/my-courses')
      }
  }
  const dispatch = useDispatch()
  const goBack = () => {
    dispatch(setEditCourse(true))
    dispatch(setStep(2))
  }
  useEffect(() => {
    setValue('box', checked)
  }, [checked])
  return (
    (loading) ? (
      <div className=' absolute top-0 bottom-0 left-0
      right-0'>
        <Spinner />
      </div>
    ) :
      <div className='flex flex-col gap-4'>
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
                  <div className='
                text-[20px] cursor-pointer
                '
                    onClick={clickHandler}>
                    {!checked ? <ImCheckboxUnchecked /> : <ImCheckboxChecked />}
                  </div>

                  {/* </div> */}
                  <input
                    type="checkbox"
                    name='box'
                    id='box'
                    {...register('box', {
                      
                    })}
                    className="hidden"
                  />

                </div>

                <div onClick={clickHandler}>

                  <label className='text-richblack-400' htmlFor="box">
                    Make this Course Public
                  </label>

                </div>
              </div>

            </form>

          </div>
        </div>
        <div>


          <div className='text-richblack-5
              font-inter 
              text-base font-medium 
              leading-6 text-center
              flex flex-row
              justify-between w-full
              '

          >
            <CTAButton
              active={false}
              customClass='bg-richblack-700'
              onClick={goBack}>
              <div className='flex flex-row gap-2
                  items-center
                  '>
                <div>
                  <MdOutlineKeyboardArrowLeft />
                </div>
                <div>
                  Back
                </div>
              </div>
            </CTAButton>
            <div className='flex flex-row gap-2'>
              <div>
                {/* <CTAButton
                  active={false}
                  customClass='bg-richblack-700'
                  onClick={handleSubmit((data) => submitHandler(data,true))}
                >

                  <div className='text-richblack-5
                  font-inter text-base font-medium
                  leading-6 text-center'>
                    Save as a Draft
                  </div>
                </CTAButton> */}
              </div>
              <div>

                <CTAButton
                  active={true}
                  onClick={handleSubmit((data) => submitHandler(data))}>
                  <div className='text-richblack-900
                  font-inter text-base font-medium leading-6 text-center'>
                    Save
                  </div>
                </CTAButton>
              </div>
            </div>
          </div>

        </div>
      </div>
  )
}

export default PublishCourse