import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import SidebarLink from './SidebarLink'
import ConfirmationModal from '../../common/ConfirmationModal'
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from "../../../services/operations/authAPI"
import { useEffect } from 'react';
import { useMediaQuery } from '@uidotdev/usehooks'
import { GiHamburgerMenu } from 'react-icons/gi';
import SidebarModal from './SidebarModal';
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const [openSideBar, setOpenSideBar] = useState(false)
  const {user} = useSelector(state => state.profile)
  return (



   

    <div>
      {
 (isSmallDevice) ?
(
  <div className='pl-4 w-fit '>

  <div className='w-fit  cursor-pointer '
                    
                    onClick={() => setOpenSideBar(prev => !prev)}>
                        <div className=' hover:bg-richblack-700
                        transition-all duration-200 rounded-[200px]
                        text-richblack-5'>   
                            <GiHamburgerMenu size={24}/>
                        </div>
                  
    </div>

    {
    (openSideBar && !modal) && <SidebarModal
    modal={modal}
    setModal={setModal}
    content={sidebarLinks}
    openSideBar={openSideBar}
    setOpenSideBar={setOpenSideBar}
    ></SidebarModal>
    }

    </div>
) :
(
<div 
className='  h-full p-8 xl:flex xl:flex-col gap-3 border border-richblack-700  bg-richblack-800 '>


      {
        sidebarLinks.map((ele, index) => {
          if((!ele?.type || ( ele?.type == user?.accountType)) )
          return (
            <SidebarLink type={ele.type} path={ele.path} icon={ele.icon} modal={modal} text={ele.name} key={ele.id} iconChoose={ele?.iconChoose ?? false}></SidebarLink>
          )
        })
      }
      <div className='flex mx-auto w-10/12 mt-6 mb-6  gap-3 border border-richblack-600 h-[1px]'></div>




      <SidebarLink path={"/dashboard/settings"} icon={"VscSettingsGear"} text={"Settings"} modal={modal}>
      </SidebarLink>
     
      




      <div onClick={() => {
        setModal(true);
      }} className={` cursor-pointer flex flex-row  items-center 
        font-inter text-sm font-medium leading-6 text-left 
        py-2 px-6 gap-3 bg-richblack-800  
        ${(modal) ? ("border-l-2 border-yellow-50 text-yellow-50 bg-yellow-800") :
        ("text-richblack-300 ")}`}>
        <div>

          <div className='text-lg text-richblack-300'>
            <FiLogOut></FiLogOut>
          </div>

        </div>
        <div>
          Log Out
        </div>

      </div>



   
 </div>
)


}
{
    (modal)
    &&
    <ConfirmationModal
      onClickBtn1={() => { dispatch(logout(navigate)) }} onClickBtn2={() => { setModal(false) }}
      setModal
      text1={"Are you sure?"}
      text2={"You will be logged out of your account."}
      btn1={"Log Out"}
      btn2={"Cancel"} />
 
 }
      </div >

  )
}

export default Sidebar