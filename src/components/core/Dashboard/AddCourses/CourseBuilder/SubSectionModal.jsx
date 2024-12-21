import React, { useEffect } from 'react'
import CTAButton from '../../../HomePage/Button'
import { RxCross1 } from "react-icons/rx";
import ThumbnailField from '../CourseInformation/ThumbnailField';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { addSubSection } from '../../../../../services/operations/subSectionAPI';
import TimeField from './TimeField';
import { setCourseDetails } from '../../../../../redux/slices/courseSlice';
import Spinner from '../../../../common/Spinner';
import { editSubSection } from '../../../../../services/operations/subSectionAPI';
import { useDispatch, useSelector } from 'react-redux';
import Upload from '../CourseInformation/Upload';
const SubSectionModal = ({
  edit = false,
  modal, setModal,
  subSectionId,
  setSubSectionId,
  sectionId,
  setSectionId }) => {
  // const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { courseDetails } = useSelector(state => state.course);
  const dispatch = useDispatch();
  const {token} = useSelector(state=>state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
    getValues,
    clearErrors
  } = useForm()
  useEffect(() => {
    if (edit) {
      // timeDuration,----->Remaining
      // title: getValues('title'),
      // courseDetails.courseContent.includes(sectionId).subSection.
      // includes(subSectionId);
      const section = courseDetails.courseContent.find(section => section._id === sectionId);
      const subSection = section.subSection.find(sub => sub._id === subSectionId);
      setValue('title', subSection?.title);
      setValue('desc', subSection?.description);
      const timeString = subSection?.timeDuration;
      let hours = 0, minutes = 0, seconds = 0;

      const timeParts = timeString.split(' ');

      timeParts.forEach(part => {
        if (part.includes('h')) {
          hours = parseInt(part.replace('h', ''), 10);
        } else if (part.includes('m')) {
          minutes = parseInt(part.replace('m', ''), 10);
        } else if (part.includes('s')) {
          seconds = parseInt(part.replace('s', ''), 10);
        }
      });
      // description: getValues('desc'),
      setValue('hour', hours);
      setValue('min', minutes);
      setValue('sec', seconds);
      // setValue('file',subSection.videoUrl);
    }
  }, [])
  const resetModal = () => {
    setModal(0)
    setSectionId(null)
    setSubSectionId(null)
  }
  // console.log('COURSEDETAILS FROM SUBSECTION MODAL.......',courseDetails);  
  const submitHandler = async () => {
    // console.log(getValues());
    // console.log("INSIDE SUBMIT HANDLER....");

    // console.log('SECTIONID.........',sectionId);
    let timeDuration = "";
    if (getValues('hour') !== 'HH') {
      timeDuration += `${getValues('hour')}h `;
    }
    if (getValues('min') !== 'MM') {
      timeDuration += `${getValues('min')}m `;
    }
    if (getValues('sec') !== 'SS') {
      timeDuration += `${getValues('sec')}s `
    }

      resetModal()
    

    if (!edit) {

      const result = await (addSubSection({
        sectionId,
        setSectionId,
        courseId: courseDetails._id,
        timeDuration,
        dispatch,
        title: getValues('title'),
        description: getValues('desc'),
        setCourseDetails,
        video: getValues('file'),
        setModal
      },
      token,
        setLoading
      ));
    }
    else {
      // console.log("INSIDE THE DISPATCH");
      const result = await (editSubSection({
        subSectionId,
        title: getValues('title'),
        dispatch,
        description: getValues('desc'),
        setSectionId,
        setModal,
        setSubSectionId,
        timeDuration,
        courseId: courseDetails._id,
        video: ((getValues('file') !== "" && getValues('file')) ?
          (getValues('file')) : (undefined))
      },
      token,
        setLoading,
        true))

    }
    // localStorage.setItem("courseDetails",JSON.stringify(courseDetails))


  }


  return (

    (
    //   <div style={{ backgroundColor: 'rgba(189, 189, 189, 0.9)' }}
    //     className={`fixed ${true ? ("opacity-100") :
    //       ("hidden opacity-0")}  
    //       transition-all duration-200
    //       top-0
    //       bottom-0 
    //       left-0
    //       right-0
    // overflow-y-auto 
    // flex justify-center 
    // items-center
    //     p-4
        
    //  `}>
    <div className='flex 
    flex-col  
    fixed 
    left-0 
    top-0
    right-0
    bottom-0

    backdrop-blur-md
    z-[51]
    bg-richblack-600
    bg-opacity-20
     p-8  gap-3 border border-richblack-700 
     overflow-auto'>
        {
          (false) ? (<Spinner />) : (


            <form className='flex justify-center ' onSubmit={handleSubmit(submitHandler)}>

              <div className='bg-richblack-800 
                  flex flex-col gap-6 
                  rounded-lg  
                  relative
                  
                  w-[665px]'>

                <div className=' w-full rounded-lg text-white'>
                  <div className='rounded-t-lg flex flex-row items-center py-4 px-6 gap-3
                      border border-richblack-600 bg-richblack-700
                      justify-between'>

                    <div className='w-full font-inter text-lg font-semibold
                        leading-7 text-left text-white'>
                      {
                        (!edit) ? "Adding Lecture" : "Editing Lecture"
                      }
                    </div>
                    <div className='cursor-pointer' onClick={resetModal}>
                      <RxCross1 />
                    </div>
                  </div>

                  <div className='w-full flex flex-col bg-richblack-800 p-8 gap-6'>
                    <div className='w-full flex justify-center items-center'>
                      {/* Lecture Video */}
                      {/* <ThumbnailField
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        errorMessage="Please insert the video"
                        defaultImage={(edit) ? (
                          courseDetails.courseContent.find(section => section._id === sectionId).subSection.find(sub => sub._id === subSectionId).videoUrl
                        ) : (null)}
                        customClass='md:w-full md:aspect-ratio-video'
                      /> */}
                      <Upload
                        register={register}
                        setValue={setValue}
                        name={'file'}
                        getValues={getValues}
                        errors={errors}
                        clearErrors={clearErrors}

                        defaultContent={(edit) ? (
                          courseDetails.courseContent.find(section => section._id === sectionId).subSection.find(sub => sub._id === subSectionId).videoUrl
                        ) : (null)
                        }
                        video={true}
                      >

                      </Upload>
                    </div>
                    <div className=' flex flex-col gap-1.5'>
                      {/* Lecture Title */}
                      <div className='flex flex-row gap-0.5 '>
                        <label htmlFor="title">

                          <div className='font-inter text-sm font-normal
                  leading-6 text-left text-richblack-5'>
                            Lecture Title
                          </div>
                        </label>
                        <div className='text-pink-200'>
                          *
                        </div>
                      </div>
                      <div style={{ boxShadow: "0px -1px 0px 0px #FFFFFF2E inset" }} className='bg-richblack-600
                    p-3 gap-3 rounded-lg '>

                        <input
                          placeholder='Enter Lecture Title'
                          id='title'
                          name='title'
                          {...register("title", {
                            required: {
                              value: true,
                              message: "Please enter the course title"
                            }
                          })}
                          className=" 
                    text-richblack-200
                    font-inter
                    text-base
                    font-medium
                    leading-6
                    text-left
                    bg-transparent
                    focus:outline-none
                    w-full
                    " />

                      </div>
                      {
                        errors.title && (
                          <div className='text-richblack-200'>
                            {errors.title.message}
                          </div>
                        )
                      }
                      <div className='flex flex-col gap-1.5 '>
                        {/* <div className='flex text-richblack-5 flex-row gap-0.5'>

                          <label htmlFor="time" className='text-inter
                    text-sm font-normal leading-6 text-left'>
                            Video Playback Time
                          </label>
                          <div className='text-pink-200'>
                            *
                          </div>
                        </div>
                        <div className='flex flex-row gap-6'>
                          <div>

                            <TimeField time={'hour'}
                              placeholder={'HH'} register={register}
                              errors={errors}
                              setValue={setValue}
                              getValues={getValues}
                            ></TimeField>
                          </div>

                          <div>
                            <TimeField time={'min'}
                              placeholder={'MM'}
                              register={register}
                              errors={errors}
                              setValue={setValue}
                              getValues={getValues}></TimeField>
                          </div>
                          <div>
                            <TimeField time={'sec'}
                              placeholder={'SS'}
                              register={register}
                              errors={errors}
                              setValue={setValue}
                              getValues={getValues}></TimeField>
                          </div>
                        </div>
                        {
                          (errors.hour &&
                            errors.sec &&
                            errors.min
                          ) && (
                            <div className='text-richblack-200'>
                              {`Please enter the time limit.`}
                            </div>
                          )
                        } */}
                      </div>
                    </div>

                    <div className='flex flex-col gap-1.5'>
                      {/* Lecture Description */}

                      <div className='flex flex-row gap-0.5 font-inter
              text-sm font-normal leading-6 text-left'>
                        <div className='text-richblack-5'>
                          <label htmlFor="desc">
                            Lecture Description
                          </label>
                        </div>
                        <div className='text-pink-200'>
                          *
                        </div>
                      </div>

                      <div className='text-richblack-800 p-3 gap-3 
              rounded-lg bg-richblack-600'
                        style={{ boxShadow: '0px -1px 0px 0px rgba(255, 255, 255, 0.18 inset' }} >

                        <div className='font-inter
                  text-base
                  font-normal
                  leading-6
                  text-left text-richblack-200 bg-richblack-600'>
                          <input

                            type="text"
                            id='desc'
                            name='desc'
                            {...register("desc",
                              {
                                required: {
                                  value: true,
                                  message: "Please enter the course description."
                                }
                              })}

                            className='focus:outline-none bg-transparent
                    w-full'
                            placeholder='Write the lecture description' />

                        </div>

                      </div>
                      {
                        (errors.desc
                        ) && (
                          <div className='text-richblack-200'>
                            {`Please enter the lecture description`}
                          </div>
                        )
                      }
                    </div>

                  </div>

                  <div className=' px-8 pb-8 bg-richblack-800 flex 
              flex-row justify-end
              gap-5 rounded-b-lg'>
                    {/* footer */}

                    <CTAButton active={false}
                      onClick={resetModal}
                      bgColor={"bg-richblack-700"}>
                      <div className='text-richblack-5
              font-inter text-base 
              font-medium leading-6 text-center
              '
                      >
                        Cancel
                      </div>
                    </CTAButton>
                    <CTAButton active={true}
                      onClick={() => {
                        // console.log("hey");
                        handleSubmit(submitHandler)()
                      }}>

                      <div className='text-richblack-900 
              font-inter text-base 
              font-medium leading-6 text-center'>
                        Save Edits
                      </div>
                    </CTAButton>
                  </div>
                </div>
              </div>
            </form>
          )
        }
      </div>
    )
  )
}

export default SubSectionModal