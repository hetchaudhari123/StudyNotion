import React from 'react'
import CTAButton from '../components/core/HomePage/Button'
import { useLocation, useNavigate } from 'react-router-dom'
const ResetPasswordSuccessful = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ''; // Retrieve the email from state
  let hidden_email = "xxx";
  if(email !== ''){

      let [localPart, domain] = email.split('@');
      let transformedLocalPart = localPart[0] + '*'.repeat(localPart.length - 1);
      hidden_email =  transformedLocalPart + '@' + domain;
    }
  // Join the transformed local part with the domain
  return (
    <div className='  flex-1 w-full flex justify-center items-center'>
        {/* width: Fixed (508px)px;
height: Hug (298px)px;
top: 288px;
left: 466px;
padding: 32px 0px 0px 0px;
gap: 24px;
opacity: 0px;

 */}
 {/* width: Hug (444px)px;
height: Hug (102px)px;
gap: 12px;
opacity: 0px;
 */}
 {/* //styleName: Display sm/Semibold;
font-family: Inter;
font-size: 30px;
font-weight: 600;
line-height: 38px;
text-align: left;
 */}
 {/* //styleName: Text lg/Regular;
font-family: Inter;
font-size: 18px;
font-weight: 400;
line-height: 26px; */}
{/* text-align: left; */}

        <div className='justify-between lg:w-[508px]  flex flex-col p-8 gap-6 text-richblack-900'>
            <div className='gap-3 flex flex-col'>
                <div className='font-inter text-3xl font-semibold leading-10 text-left text-richblack-5'>Reset complete!</div>
                <div className='font-inter text-lg font-normal leading-7 text-left text-richblack-100'>All done! We have sent an email to {" "}
                    <span>{hidden_email}</span> {" "}
                    to confirm</div>
            </div>
            <div onClick={() => navigate('/login')} className='"" flex flex-col gap-3'>
                {/* //styleName: Text md/Medium;
font-family: Inter;
font-size: 16px;
font-weight: 500;
line-height: 24px;
text-align: center;
 */}
                <CTAButton active={true}>
                    <div className='font-inter text-base font-medium leading-6 text-center text-richblack-900'>
                    Return to login
                    </div>
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default ResetPasswordSuccessful