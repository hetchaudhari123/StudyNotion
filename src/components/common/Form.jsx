import React from 'react'
import CTAButton from "../core/HomePage/Button"
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import CountryCode from "../../data/countrycode.json"
const Form = ({ padding = true }) => {
    const [loading, setLoading] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset
    } = useForm({
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
                email: ""
            })
        }
    }, [reset, isSubmitSuccessful]);
    async function submitContactForm(data) {
        try {
            setLoading(true);
            // make api call for submitting the form to the backend contact us controller
            console.log(data);
            setLoading(false);
        } catch (err) {
            console.log("ERROR IN THE FORM SUBMISSION..........", err.message);
        }
    }
    return (
        <form onSubmit={handleSubmit(submitContactForm)}>
            <div className={`${padding && "p-8"} gap-9 bg-richblack-900 `}>
                <div className='flex flex-col gap-5 '>
                    {/* <div className='flex flex-row gap-1  '> */}
                    <div className='flex flex-row gap-5  w-full justify-between'>

                        <div className='flex flex-col gap-2  w-1/2 relative'>
                            <div className='
                        text-richblack-5
                        font-inter text-sm font-normal leading-5 text-left
                        flex gap-1 '>

                                <label htmlFor="firstname"
                                >First Name</label>

                            </div>
                            <div className=''>

                                <input
                                    type="text"
                                    placeholder='Enter first name'
                                    id="firstname"
                                    name="firstname"

                                    required
                                    {...register("firstname", { required: { value: true, message: "Please enter Phone Number" } })}
                                    style={{
                                        border: '0px solid transparent',
                                        borderBottom: '1px solid #FFFFFF2E',
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        // color: '#2D3748'
                                    }}
                                    className='w-full font-inter bg-richblack-800 text-richblack-200  text-base font-medium leading-6 text-left p-3 gap-3 rounded-lg '
                                />
                                {
                                    errors.firstname &&
                                    <span className=' absolute right-0 top-0
                                 font-inter text-sm font-normal leading-6 text-left text-richblack-200'>
                                        {errors.firstname.message}
                                    </span>

                                }
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 w-1/2 relative'>

                            <label htmlFor="firstname"
                                className='
                        text-richblack-5
                        font-inter text-sm font-normal leading-5 text-left
                        flex gap-1 '>Last Name</label>
                            <div>

                                <input
                                    type="text"
                                    placeholder='Enter last name'
                                    id="lastname"
                                    name="lastname"
                                    required
                                    {...register("lastname", { required: { value: true, message: "Please enter your last name" } })}
                                    style={{
                                        border: '0px solid transparent',
                                        borderBottom: '1px solid #FFFFFF2E',
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        // color: '#2D3748'
                                    }}
                                    className='w-full font-inter bg-richblack-800 text-richblack-200 text-base font-medium leading-6 text-left p-3 gap-3 rounded-lg '
                                />
                                {
                                    errors.lastname &&
                                    <span className=' absolute top-0 right-0
                                 font-inter text-sm font-normal leading-6 text-left text-richblack-200'>
                                        {errors.lastname.message}
                                    </span>

                                }
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 relative'>
                        {/* Email Address */}
                        <div className='flex flex-col gap-1'>
                            <label className='
                        text-richblack-5
                        font-inter text-sm font-normal leading-5 text-left
                        flex gap-1 ' htmlFor="email">Email Address</label>
                        </div>
                        <div>

                            <input type="text"
                                placeholder='Enter email address'
                                id="email"
                                name="email"
                                required
                                {...register("email", { required: { value: true, message: "Please enter your email address" } })}
                                style={{
                                    border: '0px solid transparent',
                                    borderBottom: '1px solid #FFFFFF2E',
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    // color: '#2D3748'
                                }}
                                className='w-full font-inter bg-richblack-800 text-richblack-200 text-base font-medium leading-6 text-left p-3 gap-3 rounded-lg ' />

                            {
                                errors.email &&
                                <span className=' absolute right-0 top-0
                                 font-inter text-sm font-normal leading-6 text-left text-richblack-200'>
                                    {errors.email.message}
                                </span>

                            }
                        </div>
                    </div>
                    <div className='flex flex-row gap-5  '>

                        <div className='flex flex-col  gap-2 w-[30%]'>

                            <label htmlFor="code" className='flex gap-1 
                    font-inter text-sm font-normal leading-6 text-left text-richblack-5' >Phone number</label>
                            <select  {...register("countrycode", { required: true })} style={{ boxShadow: '0px -1px 0px 0px #FFFFFF2E inset' }} className='bg-richblack-800 p-3 gap-3 rounded-lg font-inter text-base font-medium leading-6 text-left text-richblack-200 ' name="dropdown" id="dropdown">
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
                        <div className='relative  flex flex-col flex-1 justify-end'>
                            {/* background: #999DAA;
*/}
                            <input   {...register("phoneNo", {
                                required: { value: true, message: "Please enter Phone Number" },
                                maxLength: { value: 10, message: "Invalid Phone Number" },
                                minLength: { value: 8, message: "Invalid Phone Number" }
                            })} style={{ boxShadow: '0px -1px 0px 0px #FFFFFF2E inset' }} name='phoneNo' id='phoneNo' type="tel" className='p-3 gap-3 rounded-lg bg-richblack-800 font-inter text-base font-medium leading-6 text-left text-richblack-200 ' />
                            {
                                errors.phoneNo &&
                                <span className='  absolute right-0
                            top-0 font-inter text-sm font-normal leading-6 text-left text-richblack-200'>
                                    {errors.phoneNo.message}
                                </span>
                            }
                        </div>
                    </div>
                    {/* </div> */}
                    <div className='flex flex-col gap-2'>
                        {/* Message */}
                        <div className='flex gap-1'>
                            <label htmlFor="message"
                                className='
                  text-richblack-5
                  font-inter text-sm font-normal leading-5 text-left
                  flex gap-1 '>Message</label>
                        </div>

                        <div>
                            <textarea
                                rows="7"
                                name="message"
                                id="message"
                                placeholder='Enter the text message'
                                {...register("message", { required: true })}
                                style={{
                                    boxShadow: '0px -1px 0px 0px #FFFFFF2E inset'
                                }} className=' w-full   bg-richblack-800 
                    font-inter  text-richblack-200 text-base font-medium leading-6 text-left p-3 gap-3 rounded-lg'>
                            </textarea>
                            {
                                errors.message &&
                                <span className='  absolute right-0
                                top-0 font-inter text-sm font-normal leading-6 text-left text-richblack-200'>
                                    {errors.message.message}
                                </span>

                            }
                        </div>
                    </div>
                    <div>
                        <CTAButton active={true} onClick={handleSubmit(submitContactForm)}>
                            Send Message
                        </CTAButton>
                        {/* <button> */}
                        {/* <div className='p-3 bg-yellow-5 gap-2 rounded-lg border-2 border-black'> */}
                        {/* Send Message */}
                        {/* </div> */}
                        {/* </button> */}
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Form