import { useState } from 'react'
import CTAButton from '../HomePage/Button'
import { RxCross1 } from "react-icons/rx";
import ReactStars from 'react-stars';
import { useForm } from 'react-hook-form';
import { buildRating } from '../../../services/operations/courseAPI';
import Spinner from '../../common/Spinner';
import { useSelector } from 'react-redux';
import { updateUserRating } from '../../../services/operations/reviewAPI';
const ReviewModal = ({
    editReview = null,rating = 0,review = "",setReviewModal}) => {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue
    } = useForm({
        defaultValues:{
            'rating': rating,
            'review': review
        }
    });

    const {user} = useSelector(state => state.profile)
    // console.log("USER....",user.image)

    const {courseDetails} = useSelector(state => state.course)

    const {token} = useSelector(state=>state.auth);

    const submitHandler = async () => {
        // console.log("EDIT REVIEW INSIDE REVIEW MODAL.....",editReview)
        if(!editReview){

            await buildRating({rating:getValues('rating'),review:getValues('review'),
                courseId:courseDetails._id},token,setLoading,true)
            }
        else{

            await updateUserRating({rating:getValues('rating'),review:getValues('review'),
                courseId:courseDetails._id},token,setLoading,true)
            }
            setReviewModal(false)
    }


  return (
    (courseDetails) ? 
    <div style={{ backgroundColor: 'rgba(189, 189, 189, 0.9)' }} className={`fixed ("opacity-100")  top-0 left-0 bottom-0 right-0 transition-all duration-200`}>

    <div className='bg-richblack-800 
    flex flex-col gap-6  
    fixed left-1/2 top-1/2 
    translate-x-[-50%] 
    translate-y-[-50%] 
    rounded-lg
    md:min-w-[450px]
    '>
            
        <div className='text-richblack-5 font-inter text-xl 
        font-medium leading-10 text-center
        bg-richblack-700 p-4 rounded-t-lg
        flex flex-row justify-between items-center'>
            <div>
            Add Review
            </div>
            <div className='cursor-pointer' onClick={() => setReviewModal(false)}>
            <RxCross1/>
            </div>
        </div>

        <div className='
        p-4
        text-richblack-300 font-inter text-sm font-normal leading-5 text-center
         flex flex-col 
        gap-6'>
         
            <div className='text-richblack-5 font-inter text-sm font-medium
            leading-6 text-left  flex  justify-center
            items-center gap-2'>
            <div className=''>
                <img 
                src={user.image} 
                alt={user?.firstName + " " + user?.lastName + " image"} 
                className='rounded-[200px] w-[50px] aspect-square'/>
            </div>
            <div className='text-xl'>
                {user?.firstName + " " + user?.lastName}
            </div>
            </div>
            <div className='flex flex-row justify-center'>
                <ReactStars
                    value={getValues('rating')}
                    count={5}
                    size={24}
                    color2={'#ffd700'} 
                    onChange={(s) => setValue('rating',s)}
                    /> 
            </div>
            <div>
                <form className='flex flex-col gap-4'>
                <label className=' gap-0.5 flex flex-row  text-richblack-5' htmlFor="courseTitle">Add Your Experience <span className='text-pink-200'>*</span>
                </label>
                    <textarea
                                name="review"
                                id="review"
                                
                                {...register("review", 
                                    { required: { value: true, 
                                        message: "Please enter the review" } })}
                                placeholder={`Add Your Experience`}
                                className='p-3 gap-3 rounded-lg 
                        focus:outline-none
                        bg-richblack-700 
                        text-richblack-200
                        font-inter
                        text-base
                        font-normal
                        leading-6
                        text-left
                        
                        md:h-[127px]
                        md:w-[617px]'
                            ></textarea>
                </form>
                <div className='
                            flex justify-end'>

                            {
                                errors.review && (
                                    <div className='text-richblack-200'>
                                        {errors.review.message}
                                    </div>
                                )
                            }
                            </div>
              
            </div>
            <div className='flex flex-row justify-end gap-2 '>
                        <CTAButton active={false}
                        customClass='bg-richblack-700'
                        onClick={() => {}}>
                            Cancel
                        </CTAButton>
                        <CTAButton active={true}
                        onClick={handleSubmit(submitHandler)}>
                            Save
                        </CTAButton>
                    </div>
        </div>
       
    </div>
    </div> : (
        <div>
            <Spinner>

            </Spinner>
        </div>
    )
  )
}

export default ReviewModal