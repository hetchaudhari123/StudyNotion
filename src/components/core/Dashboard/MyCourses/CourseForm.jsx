import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { fetchCategory } from '../../../../services/operations/categoryAPI';
import Spinner from "../../../common/Spinner"
import { useDispatch } from 'react-redux';
import TagField from './TagField';
import ThumbnailField from './ThumbnailField';
import RequirementsField from './RequirementsField';
import CTAButton from "../../HomePage/Button"
import { FaAngleRight } from "react-icons/fa6";
const CourseForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset,
        watch,
        setValue,
        getValues
    } = useForm({

    });

    const [reqList, setReqList] = useState([]);
    const dispatch = useDispatch();
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tagList, setTagList] = useState([]);
    console.log(category);
    useEffect(() => {
        dispatch(fetchCategory(setCategory, setLoading, false));
    }, [])
    if (loading) {
        return (
            <Spinner></Spinner>
        )
    }
    const submitHandler = (data) => {
        console.log(data);
    }
    return (
        <form className='mt-4 ml-8 flex flex-col gap-4  w-[665px]' onSubmit={handleSubmit(submitHandler)}>
            <div className='p-6 gap-7 flex flex-col rounded-lg border 
            border-richblack-700 bg-richblack-800'>
                <div className='flex flex-col gap-1.5 font-inter text-sm font-normal leading-6 text-left'>
                    <label className='gap-0.5 flex flex-row  text-richblack-5' htmlFor="courseTitle">Course Title <span className='text-pink-200'>*</span>
                    </label>

                    <div style={{ boxShadow: "0px -1px 0px 0px #FFFFFF2E inset" }} className='flex flex-row bg-richblack-700 p-3 gap-3 rounded-lg'>

                        <input type="text"
                            name='courseTitle'
                            id='courseTitle'
                            placeholder='Enter Course Title'
                            {...register("courseTitle", { required: { value: true, message: "Please enter course title" } })}
                            className='bg-transparent focus:outline-none text-richblack-200 font-inter text-base font-medium leading-6 text-left'
                        />
                        {
                            errors.courseTitle && (
                                <span className='text-richblack-200'>
                                    {errors.courseTitle.message}
                                </span>
                            )
                        }

                    </div>

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
                            {...register("courseDec", { required: { value: true, message: "Please enter course description" } })}
                            placeholder='Enter Description'
                            className='p-3 gap-3 rounded-lg 
                        focus:outline-none
                        bg-richblack-700 
                        text-richblack-200
                        font-inter
                        text-base
                        font-normal
                        leading-6
                        text-left
                        h-[127px]
                        w-[617px]'
                        >

                        </textarea>
                        {
                            errors.courseDec && (
                                <span className='text-richblack-200'>
                                    {errors.courseDec.message}
                                </span>
                            )
                        }
                    </div>
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
                                {...register("price", { required: { value: true, message: "Please enter the price" } })}
                                className='text-richblack-200
                                bg-transparent
                                focus:outline-none
                                font-inter
                                text-base
                                font-medium
                                leading-6
                                text-left
                                '/>
                            {errors.price && (
                                <span>
                                    {errors.price.message}
                                </span>
                            )}
                        </div>

                    </div>
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

                        <div className='bg-richblack-700'>
                            Choose a Category
                        </div>
                        <select
                            {...register("category", { required: { value: true, message: "Please select a category" } })}
                            className='bg-richblack-700 focus:outline-none' >
                            {
                                category.map((ele, index) => (
                                    <option
                                        value={ele._id}
                                        key={index}
                                    >
                                        {ele.name}
                                        {/* _id: '66716d0b31080dde34df5049', name: 'Android', description: 'Android is scary */}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                </div>
                <div>
                    <TagField
                        setValue={setValue} register={register} tag={"tag"}
                        setTagList={setTagList}
                        tagList={tagList}></TagField>
                </div>
                <div>
                    <ThumbnailField
                        setValue={setValue} register={register}
                    ></ThumbnailField>
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
                        font-inter text-base font-medium leading-6 text-left w-[617px] h-[127px]'

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
                        {
                            errors.benefit && (<div>
                                {
                                    errors?.benefit?.message
                                }
                            </div>)
                        }
                    </div>
                </div>
                <RequirementsField
                    getValues={getValues}
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    reqList={reqList}
                    setReqList={setReqList} />
            </div>
            <div className='flex justify-end mb-4' onClick={submitHandler}>
                <CTAButton active={true} >
                    <div className='flex flex-row items-center w-fit'>
                        <div className='flex text-richblack-900 font-inter
                            text-base font-medium leading-6 text-center'>
                            Next
                        </div>
                        <div>
                            <FaAngleRight />
                        </div>
                    </div>
                </CTAButton>
            </div>
        </form >
    )
}

export default CourseForm