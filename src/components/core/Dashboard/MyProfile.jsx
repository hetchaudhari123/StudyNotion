import { useSelector } from 'react-redux';
import EditBtn from './EditBtn';
import Header from './Header';
import { formatString } from '../../../services/formatString';
import { useMediaQuery } from '@uidotdev/usehooks';
const MyProfile = () => {
  const { user } = useSelector(state => state.profile);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  // console.log(user);
  return (
    <div className='mb-4'>
      <Header text1={"My Profile"} text2={"My Profile"}></Header>
      <div className='mr-4 md:mt-4 md:mx-4 md:mb-4 lg:ml-24 lg:mt-8 lg:w-[792px]   flex flex-col gap-11'>
        <div className=' text-richblack-800 p-6 flex flex-row gap-5 items-center justify-between rounded-lg border border-richblack-700'>
          <div className=' flex flex-row items-center gap-6 '>
            <div>
              <img className='w-[78px] aspect-square 
              rounded-full text-richblack-5
              
              ' src={`${user?.image}`} 
              alt={`${user?.firstName + " " + user?.lastName + " Profile image"}`} />
            </div>
            <div className='flex flex-col gap-1'>

              <div className='font-inter text-lg font-semibold leading-7 text-left text-richblack-5'>
                {user?.firstName + " " + user?.lastName}
              </div>

              <div className='font-inter text-sm font-normal leading-6 text-left text-richblack-300'>
                {user?.email}
              </div>
            </div>
          </div>
          <div>
            <EditBtn></EditBtn>
          </div>
        </div>

        <div className='p-6 flex flex-col  text-richblack-800 gap-5 rounded-lg border border-richblack-700 '>
          <div className='flex flex-row gap-5 w-full justify-between'>
            <div className='font-inter text-lg font-semibold leading-6 text-left text-richblack-5'>
              About
            </div>
            <div>
              <EditBtn></EditBtn>
            </div>
          </div>
          <div className='w-full  flex flex-row gap-1 '>
            <div className='w-1/2 flex flex-col gap-0.5 justify-between    '>




              <div className='font-inter text-sm font-normal leading-6 text-left text-richblack-300'>
                {user?.additionalDetails?.about ?? "Write Something About Yourself!"} 
                </div>
            </div>

          </div>
        </div>
        <div className='p-6 flex flex-col  text-richblack-800 gap-5 rounded-lg border border-richblack-700 '>
          <div className='flex flex-row gap-5 w-full justify-between'>
            <div className='font-inter text-lg font-semibold leading-6 text-left text-richblack-5'>
              Personal Details
            </div>
            <div>
              <EditBtn></EditBtn>
            </div>
          </div>
          <div className='w-full  flex flex-row gap-1'>
            <div className='w-1/2 flex flex-col gap-0.5 justify-between    '>

              <div className='font-inter text-sm font-normal leading-5 text-left text-richblack-600'>First Name</div>

              <div className='font-inter text-sm font-medium leading-5 text-left text-richblack-5'>{(isSmallDevice) ? formatString(user?.firstName,10) :(user?.firstName)}</div>
            </div>
            <div className='w-1/2 flex flex-col gap-0.5 justify-between  '>
              <div className='font-inter text-sm font-normal leading-5 text-left text-richblack-600'>Last Name</div>

              <div className='font-inter text-sm font-medium leading-5 text-left text-richblack-5'>{(isSmallDevice) ? formatString(user?.lastName,10) :(user?.lastName)}</div>

            </div>
          </div>
          <div className='w-full  flex flex-row gap-1 '>
            <div className='w-1/2 flex flex-col gap-0.5 justify-between    '>

              <div className='font-inter text-sm font-normal leading-5 text-left text-richblack-600'>Email</div>


              <div className='font-inter text-sm font-normal leading-6 text-left text-richblack-5'>{(isSmallDevice) ? formatString(user?.email,10) : user?.email}</div>
            </div>
            <div className='w-1/2 flex flex-col gap-0.5 justify-between  '>
              <div className='font-inter text-sm font-normal leading-5 text-left text-richblack-600'>Phone Number</div>

              <div className='font-inter text-sm font-medium leading-5 text-left text-richblack-5'>{(isSmallDevice) ? formatString(user?.additionalDetails?.contactNumber ?? "Not provided yet!",10) : (user?.additionalDetails?.contactNumber ?? "Not provided yet!")}</div>

            </div>

          </div>
          <div className='w-full  flex flex-row gap-1'>

            <div className='w-1/2 flex flex-col gap-0.5 justify-between  '>
              <div className='font-inter text-sm font-normal leading-5 text-left text-richblack-600'>Gender</div>

              <div className='font-inter text-sm font-medium leading-5 text-left text-richblack-5'>{(isSmallDevice) ? formatString(user?.additionalDetails?.gender ?? "Not provided yet!",10):user?.additionalDetails?.gender ?? "Not provided yet!"}</div>

            </div>
            <div className='w-1/2 flex flex-col gap-0.5 justify-between  '>
              <div className='font-inter text-sm font-normal leading-5 text-left text-richblack-600'>Date of Birth</div>

              <div className='font-inter text-sm font-medium leading-5 text-left text-richblack-5'>{(isSmallDevice) ? formatString(user?.additionalDetails?.dateOfBirth ?? "Not provided yet!",10):user?.additionalDetails?.dateOfBirth ?? "Not provided yet!"}</div>

            </div>
          </div>
        </div>

      </div>
    </div>

  )
}

export default MyProfile