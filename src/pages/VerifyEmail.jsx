import React, { useState,useEffect } from 'react'
import OtpInput from 'react-otp-input';
import { BiArrowBack } from "react-icons/bi"
import CTAButton from "../components/core/HomePage/Button"
import { FaHistory } from "react-icons/fa";
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
const VerifyEmail = () => {
  const {signupData} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if(!signupData){
      toast.error('Sign up first');
      navigate('/signup');
    }
  },[]);
  const {accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword} = signupData ? signupData : {};
  const [otp, setOtp] = useState();
  function submitHandler(){
    dispatch(signUp(accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
      navigate));
  }
  return (
    <div className='flex-1 w-full flex justify-center items-center '>
      <div className='flex flex-col lg:h-[370px] lg:w-[508px]  p-8 gap-6 '>
        <div className='flex flex-col gap-3  '>
          <div className='text-left font-inter font-semibold leading-10 text-richblack-5 text-3xl'>Verify email</div>
          <div className='font-inter text-lg font-normal leading-7 text-left text-richblack-100'>A verification code has been sent to you. Enter the code below</div>
        </div>
        <div className=' w-full'>

          <div className=' w-fit mx-auto'>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => {
                return (
                  <div className=' p-3 gap-3 rounded-lg bg-richblack-800 ' style={{ 'boxShadow': '0px -1px 0px 0px #FFFFFF2E inset' }}>
                    <input {...props} className='font-inter text-base font-medium leading-6 text-left focus:outline-none bg-transparent text-richblack-5' />
                  </div>
                )
              }}
            />
          </div>

        </div>
        {/* 12px */}
        <div className='flex flex-col gap-3'>
          <div onClick={() => {submitHandler()}}>
            <CTAButton active={true}>
              <div className='font-inter text-base font-medium leading-6 text-center text-richblack-900'>
                Verify Email
              </div>
            </CTAButton>
          </div>
          <div className='flex flex-row gap-3  items-center justify-between cursor-pointer' onClick={() => {navigate("/login")}}>
            <div className='p-3 gap-2 rounded-lg  flex items-center justify-center'>
              <div className='text-richblack-5'><BiArrowBack /></div>
              <div className='text-richblack-5 font-inter text-base font-medium leading-6 text-center '>
                Back to login
              </div>
            </div>

            <div onClick={() => {dispatch(sendOtp(email,navigate))}} className='flex p-3 gap-2 rounded-lg  items-center cursor-pointer'>
              <div className='text-blue-100'><FaHistory /></div>
              <div className='font-text text-base font-medium leading-6 text-center text-blue-100'>Resend it</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default VerifyEmail