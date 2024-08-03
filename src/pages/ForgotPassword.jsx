import React from 'react'
import { useSelector } from 'react-redux';
import CTAButton from "../components/core/HomePage/Button"
import { GoArrowLeft } from "react-icons/go";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import Spinner from "../components/common/Spinner"
const ForgotPassword = () => {
  const dispatch = useDispatch();
  
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector(state => state.auth);
  function changeHandler(e) {
    setEmail(e.target.value);
  }
  function submitHandler(e){
    e.preventDefault();
    dispatch(getPasswordResetToken(email,setEmailSent));
  }
  return (
   (loading) ? (
    <div className=' h-screen fixed w-screen'>
    <Spinner/>
    </div>
   ):
    <div className='flex flex-col justify-center items-center flex-1'>
      <div className='lg:w-[508px] lg:h-[448px] p-8 flex flex-col justify-center gap-9 text-richblack-900 '>
        {
          !emailSent ? (<div className='flex flex-col justify-between gap-3  '>
            <div className='font-inter text-3xl font-light leading-10 text-left text-richblack-5'>Reset Password</div>
            <p className='font-inter text-lg font-normal leading-7 text-left text-richblack-100'>Have no fear. We'll email you instructions to reset your password</p>
          </div>) : (<div className='flex flex-col justify-between gap-3'>
            <div className='font-inter text-3xl font-light leading-10 text-left text-richblack-5'>
              Check email
            </div>
            <p className='flex flex-col font-inter text-lg font-normal leading-7 text-left text-richblack-100'>
              We have sent the reset email to
              <div>

              {
                email
              }
              </div>
            </p>
          </div>)
        }
        {
          !emailSent && (<div>
            <form onSubmit={submitHandler}>
              <div className=''>
                <label className='flex flex-col gap-2 '>
                  <p className='font-inter text-sm font-normal leading-5 text-left text-richblack-5'>
                    Email Address <span className='text-pink-200'>*</span>
                  </p>
                  <div className='p-3 gap-3 rounded-lg bg-richblack-800' style={{ boxShadow: '0px -1px 0px 0px #FFFFFF2E' }}>

                    <input
                      name='email'
                      required
                      placeholder='Enter your email address'
                      value={email}
                      onChange={changeHandler}
                      className='w-full  font-inter text-base font-medium leading-6 text-left bg-transparent focus:outline-none text-richblack-5'
                    />
                  </div>
                </label>
              </div>

            </form>
          </div>) 
        }
        <div  className=' flex flex-col gap-3'>
          <div className='rounded-lg ' onClick={submitHandler}>

          <CTAButton  active={true} linkto={false} >
            <div className='font-inter text-base font-medium leading- text-center leading-6 text-richblack-900'>
              {
              !emailSent ? "Reset Password": "Resend email"
              }
            </div>
          </CTAButton>
          </div>
          {/* //styleName: Text md/Medium;
font-family: Inter;
font-size: 16px;
font-weight: 500;
line-height: 24px;
text-align: center;
 */}

              <Link to="/login">
            <div className='pt-3 gap-2 rounded-lg flex flex-row items-center'>
            <div className='text-richblack-5'><GoArrowLeft /></div>
            <p className='text-richblack-5 font-inter text-base font-medium leading-6 text-center cursor-pointer'>
              Back to Login
            </p>
          </div>
              </Link>
          
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword