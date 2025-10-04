import React, { useState,useEffect } from 'react'
import CTAButton from '../components/core/HomePage/Button';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { Link, useLocation } from 'react-router-dom';
import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';
const UpdatePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        password:"",
        confirmPassword:""
    });
    const [req,setReq] = useState({
        lower:false,
        upper:false,
        number:false,
        special:false,
        length:false
    });
    const {password,confirmPassword} = formData;
    const {lower,upper,number,special,length} = req;
    const {loading} = useSelector((state) => state.auth);
    function changeHandler(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }
  
    function submitHandler(e){
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        // console.log(token);
        dispatch(resetPassword(password,confirmPassword,token,navigate));
    }
    useEffect(()=>{
       
        let l = false,u = false,n = false,s = false,len = false;
        for(let i = 0;i<password.length;i++){
            if(password[i] >= 'a' && password[i] <= 'z'){
                l = true;
            }
            else if(password[i] >= 'A' && password[i] <= 'Z'){
                u = true;
            }
            else if(password[i] >= '0' && password[i] <= '9'){
                n = true;
            }
            // special characters
            else if(password[i] >= '!' && password[i] <= '/'){
                s = true;
            }
        }
        if(password.length >= 8){
            len = true;
        }
        setReq({
            lower:l,
            upper:u,
            number:n,
            special:s,
            length:len
        });
    },[formData]);
    return (
        (loading) ? (
            <div className='w-full flex-1 flex justify-center items-center'>
                <div className="spinner"></div>
            </div>
        ):
       
        (<div className='w-full flex-1  flex justify-center items-center'>
           
            <form onSubmit={submitHandler} className='p-8 flex flex-col gap-6 bg-richblack-900'>
                <div className='flex flex-col gap-3'>
                    <div className='text-richblack-5 font-inter text-3xl font-semibold leading-9 text-left'>Choose new password</div>
                    <div className='text-richblack-100 font-inter text-lg font-normal leading-7 text-left'>Almost done. Enter your new password and you're all set.</div>
                </div>
                <div className='flex flex-col gap-5'>
                    <label>
                        <div className='flex flex-col gap-1.5'>
                            <div className='text-richblack-5 font-inter text-sm font-normal leading-6 text-left'>
                                New Password <span className='text-pink-200'>*</span>
                            </div>
                            <div className='p-3 flex gap-3 rounded-s-lg bg-richblack-800' style={{
                                boxShadow: '0 -1px 0 0 #FFFFFF2E inset',
                            }}>
                                <div className='w-full flex items-center  justify-between'>

                                    <input name='password' required value={password} type={`${showPassword ? "text" : "password"}`} onChange={changeHandler} placeholder='Password' className={` w-full text-richblack-200 leading-6 text-left font-inter text-base font-medium bg-transparent focus:outline-none`} />
                                    <div className='text-richblack-5 cursor-pointer' onClick={() => { setShowPassword((s) => !s) }}>

                                        {
                                            showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </label>
                    <label>
                        <div className='flex flex-col gap-1.5'>
                            <div className='text-richblack-5 font-inter text-sm font-normal leading-6 text-left'>
                                Confirm New Password <span className='text-pink-200'>*</span>
                            </div>
                            <div className='p-3 flex gap-3 rounded-s-lg bg-richblack-800' style={{
                                boxShadow: '0 -1px 0 0 #FFFFFF2E inset',
                            }}>
                                <div className='w-full flex flex-row items-center justify-between'>

                                    <input placeholder='Confirm Password' name='confirmPassword' value={confirmPassword} type={`${showConfirmPassword ? "text" : "password"}`} required onChange={changeHandler} className=' w-full text-richblack-200 leading-6 text-left font-inter text-base font-medium bg-transparent focus:outline-none' />
                                    <div className='text-richblack-5 cursor-pointer' onClick={() => {
                                        setShowConfirmPassword((s) => !s)
                                    }}>

                                        {
                                            showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </label>
                </div>
                <div className='flex gap-3'>
                    <div className='flex flex-col gap-1'>
                        {/* //styleName: Text xs/Regular;
font-family: Inter;
font-size: 12px;
font-weight: 400;
line-height: 20px;
text-align: left;
 */}
                        <div className='flex flex-row gap-1.5 items-center '>
                            <div className={`font-inter text-xs font-normal leading-5 text-left ${lower ? "text-caribbeangreen-300" : "text-pink-300"}`}>
                                {(lower) ? <CiCircleCheck/> :<RxCrossCircled/> }
                                </div>
                            <div className='font-inter text-xs font-normal leading-5 text-left text-caribbeangreen-300 '>one lowercase character</div></div>
                        <div className='flex flex-row gap-1.5 items-center'>
                            <div className={`font-inter text-xs font-normal leading-5 text-left ${upper ? "text-caribbeangreen-300" : "text-pink-300"}`}>                                 {(upper) ? <CiCircleCheck/> :<RxCrossCircled/> }
                            </div>
                            <div className='font-inter text-xs font-normal leading-5 text-left text-caribbeangreen-300'>one uppercase character</div></div>
                        <div className='flex flex-row gap-1.5 items-center'>
                            <div className={`font-inter text-xs font-normal leading-5 text-left ${number ? "text-caribbeangreen-300" : "text-pink-300"}`}>                                  {(number) ? <CiCircleCheck/> :<RxCrossCircled/> }
                            </div>
                            <div className='font-inter text-xs font-normal leading-5 text-left text-caribbeangreen-300'>one number</div></div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='flex flex-row gap-1.5 items-center'>
                            <div className={`font-inter text-xs font-normal leading-5 text-left ${special ? "text-caribbeangreen-300" : "text-pink-300"}`}>                                  {(special) ? <CiCircleCheck/> :<RxCrossCircled/> }
                            </div>
                            <div className='font-inter text-xs font-normal leading-5 text-left text-caribbeangreen-300'>one special character</div>
                        </div>
                        <div className='flex flex-row gap-1.5 items-center'>
                            <div className={`font-inter text-xs font-normal leading-5 text-left ${length ? "text-caribbeangreen-300" : "text-pink-300"}`}>                                  {(length) ? <CiCircleCheck/> :<RxCrossCircled/> }
                            </div>
                            <div className='font-inter text-xs font-normal leading-5 text-left text-caribbeangreen-300'>8 character minimum</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <div onClick={submitHandler}>
                        <CTAButton active={true}>
                            {/* //styleName: Text md/Medium;
//styleName: Text md/Medium;
font-family: Inter;
font-size: 16px;
font-weight: 500;
line-height: 24px;
text-align: center;


 */}
                            <div className='font-inter text-base font-medium leading-6 text-center text-richblack-900'>
                                Reset Password
                            </div>
                        </CTAButton>
                    </div>
                    {/* width: Fill (444px)px;
height: Hug (48px)px;
padding: 12px 0px 0px 0px;
gap: 8px;
border-radius: 8px 0px 0px 0px;
opacity: 0px;
 */}                <Link to='/login'>

                        <div className='p-3 flex flex-row gap-2 rounded-lg items-center cursor-pointer'>
                            <div className='text-richblack-5'><BiArrowBack /></div>
                            <div className='font-inter text-base font-medium leading-6 text-center text-richblack-5'>Back to login</div>
                        </div>
                    </Link>
                </div>
            </form>
        </div >
        )
    )
}

export default UpdatePassword