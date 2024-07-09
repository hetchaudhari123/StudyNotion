import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import CountryCode from "../../../data/countrycode.json"
import { useSelector } from 'react-redux'
import CTAButton from "../../core/HomePage/Button"
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from 'react-redux'
import { setProfile } from '../../../services/operations/profileAPI'
import { useNavigate } from 'react-router-dom'
const FormSettings = () => {
    const profession = [
        { name: "Student" },
        { name: "Instructor" },
        { name: "Web Developer" },
        { name: "Mobile App Developer" },
        { name: "DevOps Engineer" },
        { name: "System Architect" },
        { name: "Cloud Engineer" },
        { name: "Database Administrator" },
        { name: "UI/UX Designer" },
        { name: "Data Scientist" },
        { name: "Game Developer" }
    ]
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const { user } = useSelector(state => state.profile);
    const [imageUrl, setImageUrl] = useState(`${user?.image}`);
    const initialValues = {
        file: ``,
        display: `${user?.firstName + " " + user?.lastName}`,
        profession: `${user?.additionalDetails?.profession}`,
        dob: `${user?.additionalDetails?.dateOfBirth ?? '2024-01-24'}`,
        gender: `${user?.additionalDetails?.gender ?? ""}`,
        countrycode: "+91",
        phoneNo: `${user?.additionalDetails?.contactNumber ?? ""}`,
        currentPassword: ``,
        changePassword: ``,
        about: `${user?.additionalDetails?.about ?? ""}`
    }
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset,
        watch
    } = useForm({
        defaultValues: initialValues
    });

    const selectedValue = watch('gender');
    const navigate = useNavigate();
    // console.log(user?.email);
    const submitSettings = (data) => {
        // if (data.dob) {
        //     const [year, month, day] = data.dob.split('-');
        //     data.dob = `${day}-${month}-${year}`;
        // }
        console.log("before the data");
        console.log(data);
        console.log(user?.email);

        console.log("after the data");
        dispatch(setProfile(data,imageUrl,setLoading,navigate,user?.email));
    }
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(initialValues, {
                keepSubmitSuccessful: false  // This will reset the isSubmitSuccessful state
            })
            setImageUrl(`${user?.image}`);
        }
    }, [isSubmitSuccessful])
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            }
            reader.readAsDataURL(file);
        }
        return;
    }
    return (
        <form onSubmit={handleSubmit(submitSettings)} className='my-4 mx-auto w-[400px]  lg:ml-24 lg:mt-8 lg:w-[792px] '>
            <div className='flex flex-col gap-11'>
                <div className='p-6 flex flex-row gap-5 rounded-lg border border-richblack-700 bg-richblack-800'>
                    <div className=''>
                        {/* <img className='text-richblack-5 flex gap-6 h-[78px] w-[78px] object-contain aspect-square rounded-full' 
                        src={`${user?.image}`} 
                        alt={`${user?.firstName + " " + user?.lastName}`} /> */}
                        <img className='text-richblack-5 flex gap-6 h-[78px] w-[78px] object-contain aspect-square rounded-full'
                            // src={`${file}`} 
                            // alt={`${display}`} />
                            src={`${imageUrl}`}
                            alt={`${user?.firsName + " " + user?.lastName}`} />
                    </div>
                    <div className='flex flex-col gap-3'>
                        {/* #DBDDEA */}
                        <div className='font-inter text-base font-medium leading-6 text-left text-richblack-25'>
                            <label htmlFor="file">
                                Change Profile Picture
                            </label>
                        </div>
                        <div>
                            <input
                                type="file"
                                id="file"
                                {...register('file')}
                                name="file"
                                className='hidden'
                                onChange={handleFileChange}
                            />
                            <div className='flex flex-row gap-3'>

                                <CTAButton
                                    active={true}
                                    onClick={() => {
                                        document.getElementById('file').click()
                                    }}>

                                    <div className='font-inter text-base font-medium text-richblack-900 leading-6 text-center'>
                                        Change
                                    </div>
                                </CTAButton>
                                <CTAButton active={false} bgColor={'bg-richblack-700'}
                                    onClick={() => {
                                        console.log(document.getElementById('file').value)
                                        document.getElementById('file').value = ''
                                        console.log(document.getElementById('file').value)
                                        console.log("hey")
                                    }}>

                                    <div className='font-inter text-base font-medium bg-richblack-700 text-richblack-5 leading-6 text-center'>
                                        Remove
                                    </div>
                                </CTAButton>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Section 2 */}
                <div className='p-6 rounded-lg flex 
                flex-col gap-5 border text-richblack-700 '>

                    <div className='flex flex-col gap-5'>
                        <div className='
                            flex justify-center md:justify-between font-inter text-lg 
                            font-semibold leading-7 text-left  text-richblack-5 w-full'>
                            Profile Information
                        </div>
                    </div>
                    <div className='flex flex-col  md:flex-row  gap-6 items-start  justify-between'>
                        <div className=' flex flex-col gap-1.5 w-full md:w-1/2'>




                            <div className='flex flex-col gap-1.5'>
                                <label className='flex gap-1 font-inter text-sm
                             font-normal leading-6 text-left text-richblack-5' htmlFor='display'>Display Name</label>

                                <input name='display' id='display'
                                    type="text"

                                    {...register("display")}

                                    style={{ boxShadow: '0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset' }} className='font-inter text-base font-medium leading-6 text-left bg-richblack-700  p-3 flex flex-col gap-3 rounded-lg text-richblack-200'>
                                </input>

                                <div className='flex gap-1.5 font-inter
                            text-xs font-normal leading-5 text-left text-richblack-500'>
                                    Name entered above will be used for all issued certifies.
                                </div>
                            </div>


                        </div>
                        <div className='flex flex-col gap-1.5 w-full  md:w-1/2 '>

                            <div className='flex gap-0.5 font-inter text-sm font-normal leading-6 text-left text-richblack-5'>
                                <label htmlFor='profession'>
                                    Profession
                                </label>

                            </div>
                            <div>
                                <select
                                    {...register("profession")}
                                    name='profession'
                                    id='profession'
                                    className='p-3 gap-3 rounded-lg text-richblack-200 bg-richblack-700 w-full'
                                    style={{ boxShadow: '0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset' }}
                                >
                                    {
                                        profession.map((ele, index) => {
                                            return (

                                                <option key={index} value={ele.name} className='font-inter text-base font-medium leading-6 text-left text-richblack-200'>
                                                    {ele.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-6 md:justify-between'>
                        <div className='flex flex-col w-full md:w-1/2 gap-1.5'>
                            <div className='flex flex-col gap-0.5 text-richblack-5'>
                                <label htmlFor="dob">
                                    Date of Birth
                                </label>
                            </div>
                            {/* box-shadow: 0px -1px 0px 0px #FFFFFF2E inset;
                                */}
                            <div style={{ boxShadow: '0px -1px 0px 0px #FFFFFF2E inset' }} className='p-3 flex gap-3 rounded-lg bg-richblack-700'>
                                <input
                                    name='dob'
                                    id='dob'
                                    type="date"
                                    {...register("dob")}

                                    className='w-full font-inter text-base font-medium leading-6 text-left text-richblack-200 bg-richblack-700'
                                    placeholder='dd/mm/yyyy'

                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-1.5  w-full md:w-1/2'>

                            <div className='flex gap-0.5 font-inter text-sm font-normal text-richblack-5 leading-6 text-left'>
                                <div>
                                    Gender <span className='text-pink-200'>*</span>
                                </div>
                            </div>


                            <div style={{ boxShadow: '0px -1px 0px 0px #FFFFFF2E inset' }} className='p-3 flex bg-richblack-700 gap-3 rounded-lg'>
                                <div className='flex flex-row  w-full items-center gap-3 
                                justify-center md:justify-start md:w-fit'>
                                    <label htmlFor='male' className='flex flex-row items-center gap-3 cursor-pointer'>

                                        <input
                                            type="radio"
                                            id='male'
                                            name='gender'
                                            value='male'
                                            className='hidden'
                                            {...register('gender')}
                                        />
                                        <span className=' border-2 border-yellow-50 w-5 h-5 flex justify-center items-center rounded-full    ' >
                                            {
                                                (selectedValue === 'male') &&
                                                <span className='bg-yellow-50 h-2.5 w-2.5 rounded-full '></span>
                                            }
                                        </span>
                                        <div className='font-inter text-base font-medium leading-6 text-left text-richblack-5' >Male</div>
                                    </label>
                                    <label htmlFor='female' className='flex flex-row items-center gap-3 cursor-pointer'>

                                        <input
                                            type="radio"
                                            id='female'
                                            name='gender'
                                            value='female'
                                            className='hidden'
                                            {...register('gender')}
                                        />
                                        <span className=' border-2 border-yellow-50 w-5 h-5 flex justify-center items-center rounded-full    ' >
                                            {
                                                (selectedValue === 'female') &&
                                                <span className='bg-yellow-50 h-2.5 w-2.5 rounded-full '></span>
                                            }
                                        </span>
                                        <div className='font-inter text-base font-medium leading-6 text-left text-richblack-5' >Female</div>
                                    </label>
                                    <label htmlFor='other' className='flex flex-row items-center gap-3 cursor-pointer'>

                                        <input
                                            type="radio"
                                            id='other'
                                            name='gender'
                                            value='other'
                                            className='hidden'
                                            {...register('gender')}
                                        />
                                        <span className=' border-2 border-yellow-50 w-5 h-5 flex justify-center items-center rounded-full    ' >
                                            {
                                                (selectedValue === 'other') &&
                                                <span className='bg-yellow-50 h-2.5 w-2.5 rounded-full '></span>
                                            }
                                        </span>
                                        <div className='font-inter text-base font-medium leading-6 text-left text-richblack-5' >Other</div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row gap-6 justify-between '>
                        <div className='flex flex-col w-full lg:w-1/2 '>
                            <label htmlFor="countrycode" className='flex gap-1 
                                font-inter text-sm font-normal leading-6 text-left text-richblack-5 '>Phone number</label>
                            <div className='flex flex-row gap-5 w-full    items-end'>
                                <div className='flex flex-col  gap-2 w-[75px]'>


                                    <select  {...register("countrycode")} style={{ boxShadow: '0px -1px 0px 0px #FFFFFF2E inset' }} className='bg-richblack-800 p-3 gap-3 rounded-lg font-inter text-base font-medium leading-6 text-left text-richblack-200 ' name="countrycode" id="countrycode"
                                    >
                                        {
                                            CountryCode.map((ele, index) => {
                                                return (
                                                    <option key={index} value={ele.code}>
                                                        {ele.code} - {ele.country}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='relative flex flex-col  justify-end  flex-1'>
                                    {/* background: #999DAA;
                                */}
                                    <input   {...register("phoneNo")} style={{ boxShadow: '0px -1px 0px 0px #FFFFFF2E inset' }} name='phoneNo' id='phoneNo' type="tel" className='w-full p-3 gap-3 rounded-lg bg-richblack-800 font-inter text-base font-medium leading-6 text-left text-richblack-200 ' />
                                    {
                                        errors.phoneNo &&
                                        <span className='border-2 border-yellow-25  absolute right-0
                                    top-0 font-inter text-sm font-normal leading-6 text-left text-richblack-200'>
                                            {errors.phoneNo.message}
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1.5 lg:w-1/2'>
                            <label htmlFor='about' className='font-inter text-sm font-normal leading-6 text-left text-richblack-5'>
                                About
                            </label>
                            <div className='flex p-3 rounded-lg bg-richblack-700'>
                                <input style={{ boxShadow: '0px -1px 0px 0px #FFFFFF2E inset' }}
                                    {...register("about")}
                                    name='about'
                                    id='about'
                                    type="text" className='font-inter text-richblack-200 bg-richblack-700 appearance-none outline-none text-base font-medium leading-6 text-left w-full' placeholder='Enter Bio Details' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='p-6 gap-5 flex flex-col rounded-lg   border bg-richblack-800 border-richblack-700'>

                    <div className='text-richblack-5 
                        flex gap-5 font-inter text-lg font-semibold leading-7 text-left  justify-center lg:justify-start'>
                        Password
                    </div>
                    <div className='flex flex-col lg:flex-row gap-6'>
                        <div className='flex flex-col gap-1.5 w-full lg:w-1/2'>

                            <div className='flex gap-0.5 font-inter text-sm font-normal leading-6 text-left text-richblack-5'>
                                <label htmlFor="currentPassword">
                                    Current Password
                                </label>

                                <span className='text-pink-200'>*</span>
                            </div>
                            {/* box-shadow: 0px -1px 0px 0px #FFFFFF2E inset;
                            */}
                            <div
                                className='p-3 flex gap-3 rounded-lg bg-richblack-700 flex-row items-center'
                                style={{ boxShadow: '0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset' }}>

                                <input
                                    type={`${!showCurrentPassword ? "password" : "text"}`}
                                    id='currentPassword'
                                    name='currentPassword'
                                    className={` font-inter text-base font-medium leading-6 text-left bg-richblack-700 text-richblack-200 focus:outline-none w-full`}

                                    {...register("currentPassword", {

                                    })}
                                />
                                <div className='text-lg cursor-pointer text-richblack-5' onClick={() => {
                                    setShowCurrentPassword(prev => !prev)
                                }}>

                                    {(!showCurrentPassword) ?
                                        <FaRegEyeSlash /> : <FaRegEye />}
                                </div>

                            </div>
                        </div>
                        <div className='flex flex-col gap-1.5 w-full lg:w-1/2'>

                            <div className='font-inter text-sm font-normal leading-6 text-left flex flex-row gap-0.5 text-richblack-5'>Change Password <span className='text-pink-200'>*</span></div>

                            <div className='p-3 flex gap-3 rounded-lg bg-richblack-700 flex-row items-center'
                                style={{ boxShadow: '0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset' }}>

                                <input
                                    type={`${!showChangePassword ? "password" : "text"}`}
                                    id='changePassword'
                                    name='changePassword'
                                    className=' font-inter text-base font-medium leading-6 text-left bg-richblack-700 text-richblack-200 focus:outline-none w-full'
                                    {...register("changePassword", {

                                    })}
                                />
                                <div className='text-lg cursor-pointer text-richblack-5' onClick={() => {
                                    setShowChangePassword(prev => !prev)
                                }}>

                                    {(!showChangePassword) ?
                                        <FaRegEyeSlash /> : <FaRegEye />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='p-6 gap-5 rounded-lg flex flex-row border cursor-pointer bg-richblack-900  border-pink-700 '>
                    <div className='w-fit h-fit'>
                        <div className='p-3.5 flex gap-2.5 rounded-full 
                        bg-pink-700 text-2xl cursor-pointer '>
                            <FiTrash2 />
                        </div>
                    </div>

                    <div className=' gap-2 flex flex-col justify-start'>

                        <div className='font-inter text-lg font-bold leading-7 text-left text-pink-5'>Delete Account</div>
                        <div className='flex flex-col gap-0.5'>

                            <div className='font-inter text-sm font-medium leading-6 text-left text-pink-25'>Would you like to delete account?</div>
                            <div className='font-inter text-sm font-medium leading-6 text-left text-pink-25'>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</div>

                        </div>

                        <div className='font-inter text-base italic font-medium leading-6 text-left text-pink-300 '>
                            I want to delete my account.
                        </div>
                    </div>
                </div>
                <div className='flex flex-row justify-end gap-4'>

                    <CTAButton active={false} bgColor={"bg-richblack-700"}>

                        <div className='font-inter text-base font-medium leading-6 text-center text-richblack-5'>
                            Cancel
                        </div>
                    </CTAButton>
                    <CTAButton active={true} onClick={handleSubmit(submitSettings)}>

                        <div className='font-inter text-base font-medium leading-6 text-center  text-richblack-900'>
                            Save
                        </div>
                    </CTAButton>
                </div>
            </div>
        </form>

    )
}

export default FormSettings