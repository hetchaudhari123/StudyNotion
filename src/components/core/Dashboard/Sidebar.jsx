import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import SidebarLink from './SidebarLink'
import ConfirmationModal from '../../common/ConfirmationModal'
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from "../../../services/operations/authAPI"
import { useEffect } from 'react';
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  return (



    <div className='hidden h-full p-8 xl:flex xl:flex-col gap-3 border border-richblack-700 bg-richblack-800'>

      {
        sidebarLinks.map((ele, index) => {
          return (
            <SidebarLink type={ele.type} path={ele.path} icon={ele.icon} modal={modal} text={ele.name} key={ele.id}></SidebarLink>
          )
        })
      }
      <div className='flex mx-auto w-10/12 mt-6 mb-6  gap-3 border border-richblack-600 h-[1px]'></div>
      <SidebarLink path={"/dashboard/settings"} icon={"VscSettingsGear"} text={"Settings"} modal></SidebarLink>
      {/* <SidebarLink path={"/dashboard/logout"} icon={"FiLogOut"} text={"Log Out"}></SidebarLink> */}
      <div onClick={() => {
        setModal(true);
      }} className={`cursor-pointer flex flex-row  items-center font-inter text-sm font-medium leading-6 text-left py-2 px-6 gap-3 bg-richblack-800  ${(modal) ? ("border-l-2 border-yellow-50 text-yellow-50 bg-yellow-800") :
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
      
    

        <div style={{ backgroundColor: 'rgba(189, 189, 189, 0.9)' }} className={`fixed ${modal ? ("opacity-100") : ("hidden opacity-0") } top-0 left-0 bottom-0 right-0 transition-all duration-200`}>

          <ConfirmationModal
            onClickBtn1={() => { dispatch(logout(navigate)) }} onClickBtn2={() => { setModal(false) }}
            setModal
            text1={"Are you sure?"}
            text2={"You will be logged out of your account."}
            btn1={"Log Out"}
            btn2={"Cancel"} />
        </div>
      
    </div>

  )
}

export default Sidebar