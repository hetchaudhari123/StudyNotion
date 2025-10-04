import { useDropzone } from 'react-dropzone'
import { useState,useEffect } from 'react'
import { IoCloudUploadOutline } from "react-icons/io5";
import Spinner from '../../../../common/Spinner';
const Upload = ({
    setValue,
    name,
    register,
    getValues,
    errors,
    clearErrors,
    defaultContent = null,
    video = false,
    customClass=""
}) => {
    const [loading,setLoading] = useState(false);
    const [previewSrc,setPreviewSrc] = useState(null);
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            // setValue(name, reader.result);
            setPreviewSrc(reader.result);
            // console.log("READER RESULT",reader.result);
            setLoading(false);
        }
        setLoading(true);
        reader.readAsDataURL(file);
    }
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
            setValue(name,file)
            previewFile(file)
            // console.log("BEFORE.....",errors[name])
            clearErrors(name)
            // console.log("AFTER.....",errors[name])
        }
    }

    useEffect(() => {
        register(name, {
            required:
            {
                value: (defaultContent === "") ? true : false,
                message: `Please insert the ${video ? "video" : "image"}`
            }
        })
    }, [register]);
    useEffect(() => {
        setPreviewSrc(defaultContent);
    },[])
    useEffect(() => {
      if(defaultContent !== ""){
        clearErrors(name);
      }
    },[errors[name]])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: !video
          ? { "image/*": [".jpeg", ".jpg", ".png"] }
          : { "video/*": [".mp4"] },
        onDrop,
      })
    return (
        (loading)?(<Spinner/>):(
        <div className='w-full  gap-1.5 flex flex-col'>
          
            <div className='flex flex-row gap-0.5'>

                <div className='text-richblack-5 
                font-inter text-sm font-normal leading-6
                text-left'>
                    Course Thumbnail
                </div>
                <div className='text-pink-200'>
                    *
                </div>
              
            </div>
          
            <div  {...getRootProps()}>
                <input {...getInputProps()} />
                {
            (previewSrc)? (
              <div className='bg-richblack-700 rounded-lg flex justify-center
              items-center
              '>
            {
            (!video)
            ?
            (<img
              src={`${previewSrc}`}
              alt={'Thumbnail Image'}
              className='  text-richblack-5  
              gap-6 object-contain
              w-full
              aspect-video
              '
            />
          ):(
              
              // <Player aspectRatio="16:9" 
              // playsInline={true}
              // src={previewSrc}
              // fluid={false}
              // height={206}
              
              //  />
            // <div className="videoDiv xl:w-[50%] mx-auto relative">
              // <div className="xl:video-circle xl:absolute xl:top-[50%] xl:translate-y-[-50%] xl:left-[50%] xl:translate-x-[-50%]"></div>
              <video muted loop className="video relative
              aspect-video
              w-full">
                  <source src={previewSrc} type="video/mp4"
                   />
              </video>
          // </div>
            
            )
          }
            </div>
          
) :
              (

                <div className={` flex flex-col justify-center items-center 
                  rounded-lg gap-2
                   bg-richblack-700 
                  
                  w-full aspect-video
                  ${customClass}`}>

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
            {
                (errors[name]) && (
                    <div className='text-richblack-200'>
                        {
                            `Please insert the ${(!video) ? ("image") : ("video")}`
                        }
                    </div>
                )
              }
        </div>
        )
    )
}

export default Upload