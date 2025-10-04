import SectionForm from './SectionForm'
import CTAButton from "../../../HomePage/Button"
import { useDispatch } from 'react-redux';
import { MdOutlineKeyboardArrowLeft,MdOutlineKeyboardArrowRight } from "react-icons/md";
import { setEditCourse, setStep } from '../../../../../redux/slices/courseSlice';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
const Section = () => {
  const dispatch = useDispatch();
  const { courseDetails } = useSelector(state => state.course);
  const {courseStep} = useSelector(state => state.course)
  const goNext = () => {
    const check = courseDetails.courseContent && 
    courseDetails.courseContent.length > 0 && 
    courseDetails.courseContent.map((section,index) => {
      if(section.subSection.length === 0) return false
      return true
    })
    if(check && !check.includes(false)){
      dispatch(setStep(3))
    }
    else{
      toast.error('Atleast 1 section and 1 subsection required!')
    }
  }
  const goBack = () => {
    // DOUBT IN TERMS OF EDITING
    dispatch(setEditCourse(true))
    dispatch(setStep(1))
  }

  return (
    <div style={{ boxShadow: '0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset' }}
    className='flex flex-col bg-richblack-800 p-6 gap-7 rounded-lg '>
   
        <div className='font-inter text-2xl font-semibold leading-8
        text-left text-richblack-5'>
        Course Builder
        </div>
        <div className='gap-1.5 flex'>
            {/* Form */}
            <SectionForm/>
        </div>

        <div className='flex flex-row gap-4 justify-end'>
            <CTAButton active={false} onClick={goBack}
            bgColor={'bg-richblack-700'}>
            
              <div className=' flex flex-row justify-between 
              items-center gap-2'>
                <div className='text-richblack-5'>
                <MdOutlineKeyboardArrowLeft/>
                </div>
             
                <div className='text-richblack-5 
                font-inter text-base font-medium
                leading-6 text-center
                '>Back</div>
              </div>
            </CTAButton>
            <CTAButton active={true} onClick={goNext}>
            <div className=' flex flex-row justify-between 
              items-center gap-2'>
                <div className='text-richblack-900 
                font-inter text-base font-medium
                leading-6 text-center
                '>Next</div>
                <div className='text-richblack-900'>
                <MdOutlineKeyboardArrowRight/>
                </div>
             
                
              </div>
            </CTAButton>
        </div>
     
      
    </div>
  )
}

export default Section