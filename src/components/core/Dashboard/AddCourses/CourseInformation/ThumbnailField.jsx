import React, { useState, useEffect } from 'react'
import CTAButton from "../../../HomePage/Button"
import { BsWindowSidebar } from 'react-icons/bs';
import { IoCloudUploadOutline } from "react-icons/io5";
const ThumbnailField = ({ errorMessage,register, getValues, setValue, errors, customClass = "", defaultImage = null }) => {
  const [image, setImage] = useState(defaultImage);
  const [throwError,setThrowError] = useState(true);
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // console.log("File is.....", e?.target?.files[0]);
        if(file && throwError) setThrowError(false);
        setValue('file', file);
        setImage(reader.result);
      }
      reader.readAsDataURL(file);
    }
    return;
  }
  // useEffect(() => {
  //   console.log('FILE AFTER UPLOADING....', getValues('file'));
  // }, [getValues('file')]);
  // console.log("INSIDE SECTIONID....",sectionId);
  // console.log("IMAGE VALUE.......",image);
  // console.log('Default IMAGE.....',defaultImage);

  return (
    <div className=' w-full gap-1.5 flex flex-col'>

      <div className='flex flex-row gap-0.5 font-inter 
        text-sm font-normal leading-6 text-left'>
        <div className='text-richblack-5'>
          Course Thumbnail
        </div>
        <div className='text-pink-200'>*</div>
      </div>


      <div className={`border border-richblack-600
         bg-richblack-700
          gap-2 rounded-lg
         flex flex-col
         ${"md:h-[206px]"}
         ${"md:w-[617px]"}
         ${customClass}
         `}
        onClick={() => {
          document.getElementById('file').click()
        }}>
        {/* Input */}
        <input
          type='file'
          id='file'
          name='file'
          className='hidden'
          {...register('file',
           )}
          onChange={(e) => {
            handleFileChange(e);
          }}
        />

        <div className='w-full h-full flex justify-center'>

          {
            image ? (<img
              src={`${image}`}
              alt={'Thumbnail Image'}
              className=' text-richblack-5 flex gap-6  object-contain h-full'
            />) :
              (

                <div className='flex flex-col justify-center items-center gap-2   h-full w-full'>

                  <div className='p-3 gap-2.5 rounded-[200px] bg-pure-greys-800 w-fit h-fit text-2xl  text-yellow-50'>
                    <IoCloudUploadOutline />
                  </div>

                  <div className='font-inter text-xs font-normal leading-5 text-center text-richblack-200'>
                    Drag and drop an image, or {" "}
                    <span className='font-semibold text-yellow-50 '>Browse</span>
                    {" "}
                    Max 6MB each (12MB for videos)
                  </div>
                  <div className='gap-14 flex flex-row p-2.5'>
                    {/* Last  */}

                    <div className='font-inter text-xs font-semibold leading-5 flex flex-row text-left text-richblack-400'>
                      <li></li> Aspect ratio 16:9
                    </div>
                    <div className='font-inter text-xs font-semibold leading-5 flex flex-row text-left text-richblack-400'>
                      <li></li> Recommended size 1024x576
                    </div>
                  </div>
                </div>
              )}
        </div>
      </div>
        {
          throwError && (
            <div className='text-richblack-200'>
              {errorMessage}
            </div>
          )
        }
    </div>

  )
}

export default ThumbnailField