import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { fetchCategory } from '../../../../../services/operations/categoryAPI';
import Spinner from "../../../../common/Spinner"
import { useDispatch } from 'react-redux';
import TagField from './TagField';
import RequirementsField from './RequirementsField';
import CTAButton from "../../../HomePage/Button"
import { FaAngleRight } from "react-icons/fa6";
import { buildCourse } from '../../../../../services/operations/courseAPI';
import { useSelector } from 'react-redux';
import { setStep } from '../../../../../redux/slices/courseSlice';
import { updateCourse } from '../../../../../services/operations/courseAPI';
import Upload from './Upload';

const CourseForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        clearErrors
    } = useForm({

    });
    const [loading, setLoading] = useState(true);
    const [reqList, setReqList] = useState([]);
    const  [tagList,setTagList] = useState([])
    const dispatch = useDispatch();
    const [category, setCategory] = useState([]);
    const { editCourse, courseStep, courseDetails } = useSelector(state => state.course);
    const {token} = useSelector(state=>state.auth);
    
    const goNext = () => {
        localStorage.setItem('step', '2')
        dispatch(setStep(2));  
    }
    useEffect(() => {
       const fetch  = async () => {
        const response = await dispatch(fetchCategory(null, false));
        setLoading(false)
        setCategory(response)
       }
        fetch()
        if (editCourse) {

            setReqList(courseDetails.instructions);//--
            setTagList( courseDetails.tag);//--
            setValue('courseTitle', courseDetails.courseName);//--
            setValue('courseDesc', courseDetails.courseDescription);//--

            setValue('price', courseDetails.price);//--
            setValue('benefit',courseDetails.whatYouWillLearn);//--
            setValue('tag', courseDetails.tag);//--
            setValue('requirement', courseDetails.instructions);//--
            setValue('category', courseDetails?.category?._id);//--
        }
    }, [])

    const submitHandler = async () => {
        const { benefit, category, courseDesc, courseTitle, price, file } = getValues();
        if (!editCourse) {
            const result = await (buildCourse({
                dispatch,
                courseDescription: courseDesc,
                whatYouWillLearn: benefit,
                status: "Draft",
                courseName: courseTitle,
                price,
                tag: tagList.toString(),
                category:category,
                instructions: reqList.toString(),
                file
            },
            token,
                setLoading, true));
            if(result){
                localStorage.setItem('step', '2')
                dispatch(setStep(2))
            }
        }
        else {
            const result = await (updateCourse({
                dispatch,
                courseDescription: courseDesc,
                whatYouWillLearn: benefit,
                status: courseDetails.status,
                courseName: courseTitle,
                price,
                courseDetails,
                tag: tagList.toString(),
                category,
                instructions: reqList.toString(),
                file:(file && file !== "" ) ? (file) : (null)
            },
            token,
                setLoading, true));
                if(result){
                    localStorage.setItem('step', '2')
                    dispatch(setStep(2))
                }
        }


    }
    return (
        (loading) ? (
            <div className=' h-[calc(100vh-20rem)]'>
        <Spinner />
            </div>
    ) :
            <form className='w-[400px]   md:mt-4 md:ml-8 flex flex-col gap-4 md:w-[665px]'
                onSubmit={handleSubmit(submitHandler)}>
                <div className='p-2 md:p-6 gap-7 flex flex-col rounded-lg border 
            border-richblack-700 bg-richblack-800'>
                    <div className='flex flex-col gap-1.5 font-inter text-sm font-normal leading-6 text-left'>
                        <label className=' gap-0.5 flex flex-row  text-richblack-5' htmlFor="courseTitle">Course Title <span className='text-pink-200'>*</span>
                        </label>

                        <div style={{ boxShadow: "0px -1px 0px 0px #FFFFFF2E inset" }} className=' flex flex-row bg-richblack-700 p-3 gap-3 w-full rounded-lg'>

                            <input type="text"
                                name='courseTitle'
                                id='courseTitle'
                                placeholder='Enter Course Title'
                                {...register("courseTitle",
                                    { required: { value: true, message: "Please enter course title" } })}
                                className='bg-transparent focus:outline-none text-richblack-200 font-inter text-base font-medium leading-6 text-left w-full'
                            />


                        </div>
                        {
                            errors.courseTitle && (
                                <div className='text-richblack-200'>
                                    {errors.courseTitle.message}
                                </div>
                            )
                        }
                    </div>
                    <div className='flex flex-col gap-1.5'>

                        <div className='flex flex-row gap-0.5
                     font-inter text-sm font-normal leading-6 text-left text-richblack-5'>
                            {/* COurse short desc */}
                            Course Short Description
                            <span className='text-pink-200'>*</span>
                        </div>

                        {/* <div style={{ boxShadow: "0px -1px 0px 0px #FFFFFF2E inset" }}
                        className=''> */}
                        <div
                            className=''>

                            <textarea
                                name="courseDesc"
                                id="courseDesc"
                                
                                {...register("courseDesc", 
                                    { required: { value: true, 
                                        message: "Please enter course description" } })}
                                placeholder={`Enter Description`}
                                className='p-3 gap-3 rounded-lg 
                        focus:outline-none
                        bg-richblack-700 
                        text-richblack-200
                        font-inter
                        text-base
                        font-normal
                        leading-6
                        text-left
                        w-full
                        md:h-[127px]
                        md:w-[617px]'
                            >

                            </textarea>
                          
                        </div>
                        {
                                errors.courseDesc && (
                                    <div className='text-richblack-200'>
                                        {errors.courseDesc.message}
                                    </div>
                                )
                            }
                    </div>
                    <div className='gap-1.5 flex flex-col'>
                        {/* Price */}

                        <div className='font-inter text-sm font-normal leading-6 flex flex-row text-left gap-0.5'>
                            <div className='text-richblack-5'>
                                Price
                            </div>
                            <span className='text-pink-200'>*</span>
                        </div>

                        <div style={{ boxShadow: "0px -1px 0px 0px #FFFFFF2E inset" }}
                            className='bg-richblack-700 p-3 gap-4 rounded-lg flex flex-row items-center'>
                            {/* border: 1.5px solid #585D69 */}
                            <div className='text-richblack-5 text-2xl'>
                                <RiMoneyRupeeCircleFill />
                            </div>
                            <div>

                                <input
                                    type="text"
                                    placeholder='Enter Price'
                                    name='price'
                                    id='price'
                                    {...register("price",
                                        {
                                            required: {
                                                value: true,
                                                message: "Please enter the price",
                                                valueAsNumber: true,
                                                pattern: {
                                                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                                },
                                            }
                                        })}
                                    className='text-richblack-200
                                bg-transparent
                                focus:outline-none
                                font-inter
                                text-base
                                font-medium
                                leading-6
                                text-left
                                '/>
                              
                            </div>
                           
                        </div>
                        {errors.price && (
                                    <div className='text-richblack-200'>
                                        {errors.price.message}
                                    </div>
                                )}
                    </div>
                    <div className='gap-1.5 flex flex-col'>
                        <div className='gap-0.5 flex flex-row
                        font-inter text-sm
                        font-normal
                        leading-6
                        text-left'>

                            <label className='font-inter text-base font-medium leading-6 text-left bg-transparent focus:outline-none text-richblack-200 flex flex-row items-center' htmlFor="category">
                                <div className='text-richblack-5'>Category</div>
                                <div className='text-pink-200'>*</div>
                            </label>
                        </div>

                        <div style={{ boxShadow: "0px -1px 0px 0px #FFFFFF2E inset" }} className='bg-richblack-700 p-3 gap-4 rounded-lg flex flex-row items-center justify-between text-richblack-200'>


                            <select
                                defaultValue={(!editCourse) ? (""):(getValues('category'))}
                                // defaultValue={(!editCourse) ? (""):("AI/ML")}
                                // defaultValue={getValues('category')}
                                {...register("category", 

                                    { required: { value: true, message: "Please select a category" } })}
                                className='w-full bg-richblack-700 focus:outline-none ' >
                                <option value="" disabled>
                                    Choose a Category
                                </option>
                              
                                {!loading &&
                                    category?.map((cat, indx) => (
                                        <option 
                                        className=''
                                        key={indx} value={cat?._id}>
                                            {cat?.name}
                                        </option>
                                    ))}
                            </select>
                          
                        </div>

                    {errors.category && (
                                <div className='text-richblack-200'>
                                    {errors.category.message}</div>
                            )}
                    </div>
                    <div>
                        <TagField
                            setValue={setValue} 
                            register={register}
                            setTagList={setTagList}
                            tagList={tagList}
                            name='tag'
                            errors={errors}
                            clearErrors = {clearErrors}
                            >
                        </TagField>
                    </div>
                    <div>
                        {/* <ThumbnailField
                          defaultImage={(editCourse)? (
                            courseDetails.courseContent.find(section => section._id === sectionId).subSection.find(sub => sub._id === subSectionId).videoUrl
                          ) : (null)}
                            getValues={getValues}
                            setValue={setValue} register={register}
                            errors={errors}
                            errorMessage={"Please enter the course thumbnail"}
                        ></ThumbnailField> */}
                        <Upload 
                        errors = {errors}
                        setValue={setValue} 
                        register={register}
                        name={"file"}
                        clearErrors={clearErrors}
                        getValues={getValues}
                        defaultContent={editCourse?(
                            courseDetails.thumbnail
                        ):(null)}
                        >

                        </Upload>
                    </div>

                    <div className='flex flex-col gap-1.5'>

                        <div className='gap-0.5 flex flex-row'>

                            <div className='font-inter text-sm font-normal leading-6 text-left text-richblack-5'>
                                Benefits of the course
                            </div>
                            <div className='text-pink-200'>*</div>
                        </div>

                        <div style={{ boxShadow: "0px -1px 0px 0px #FFFFFF2E inset" }}
                            className='bg-richblack-700
                         gap-3 rounded-lg text-richblack-200
                        font-inter text-base font-medium leading-6 text-left md:w-[617px] md:h-[127px]'

                        >
                            <textarea
                                type="text"
                                placeholder="Enter Benefits of the course"
                                name='benefit'
                                id='benefit'
                                {...register("benefit", { required: { value: true, message: "Please enter course benefits" } })}
                                className='p-3 bg-transparent w-full
                            focus:outline-none h-full'
                            />
                        </div>
                            {
                                errors.benefit && (<div className='text-richblack-200'>
                                    {
                                        errors?.benefit?.message
                                    }
                                </div>)
                            }
                    </div>
                    <RequirementsField
                        getValues={getValues}
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        reqList={reqList}
                        setReqList={setReqList} 
                        clearErrors={clearErrors}
                        />
                </div>
                <div className='flex flex-row mt-4 gap-2 items-center
                justify-between'>
 {
                    (editCourse) &&
                    <div className='flex justify-end mb-4' onClick={goNext}>
                        <CTAButton active={false} customClass='bg-richblack-700'>
                            <div className='flex flex-row gap-2 items-center w-fit'>
                                <div className='flex text-richblack-200 font-inter
                            text-base font-medium leading-6 text-center'>
                                    Continue Without Changes
                                </div>
                                <div className='text-richblack-5'>
                                    <FaAngleRight />
                                </div>
                            </div>
                        </CTAButton>
                    </div>
                }
                <div className='flex justify-end mb-4' onClick={handleSubmit(submitHandler)}>

                    <CTAButton active={true}>
                        <div className='flex flex-row gap-2 items-center w-fit'>
                            <div className='flex text-richblack-900 font-inter
                            text-base font-medium leading-6 text-center'>
                                {(editCourse) ? "Save Changes" : "Next"}
                            </div>
                            <div>
                                <FaAngleRight />
                            </div>
                        </div>
                    </CTAButton>
                </div>
               
                </div>

            </form >
    )
}

export default CourseForm