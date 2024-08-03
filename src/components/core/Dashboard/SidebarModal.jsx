import React, { useEffect, useState,useRef } from 'react'
// import { NavbarLinks } from '../../data/navbar-links'
import { Link } from 'react-router-dom'
import { IoIosArrowDropdownCircle } from "react-icons/io"
import SidebarLink from './SidebarLink'
import { FiLogOut } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { logout } from '../../../services/operations/authAPI'
import ConfirmationModal from '../../common/ConfirmationModal'
const SidebarModal = ({onLinkClick, subLinks,
 content,modal,setModal,setOpenSideBar,openSideBar}) => {
    const navbarRef = useRef(null);
    // const {token} = useSelector(state=>state.auth);
    const [openCatalog,setOpenCatalog] = useState(false);
    const {user} = useSelector(state => state.profile)
    const handleClickOutside = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            
          setOpenSideBar(false);
        }
      };
    
      useEffect(() => {
        
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);



    return (
        openSideBar &&
        <div 
        ref={navbarRef}
        className={` flex flex-col h-screen fixed left-0 top-0
    backdrop-blur-md
    z-50
    bg-richblack-800
    bg-opacity-20
     p-8  gap-3 border border-richblack-700
    `}>
            {
                // content.map((ele, index) => (
                    <div 
                    className='  flex flex-col gap-3   '>
                    
                    
                          {
                            content.map((ele, index) => {
                                if((!ele?.type || ( ele?.type == user?.accountType)) )
                              return (
                                <SidebarLink type={ele.type} path={ele.path} icon={ele.icon} 
                                modal={modal} text={ele.name} key={ele.id} iconChoose={ele?.iconChoose ?? false}></SidebarLink>
                              )
                            })
                          }
                          <div  
                          className='
                          flex mx-auto w-10/12 mt-6 mb-6  gap-3 border border-richblack-600 h-[1px]'></div>
                    
                    
                    
                    
                          <SidebarLink path={"/dashboard/settings"} icon={"VscSettingsGear"} text={"Settings"} modal={modal}>
                          </SidebarLink>
                         
                          
                    
                          <SidebarLink 
                           icon={"FiLogOut"} 
                           text={"Log Out"} modal={modal}
                           onLogOutClick={() => setModal(true)}
                          iconChoose={true}
                           >
                          </SidebarLink>
                        
                         
                    
                    
                          {/* <div onClick={() => {
                            setModal(true);
                          }} className={` 
                            group hover:bg-yellow-700 hover:text-yellow-300
                            cursor-pointer flex flex-row  items-center 
                            font-inter text-sm font-medium leading-6 text-left
                             py-2 px-6 gap-3 rounded-lg
                              ${(modal) ? ("border-l-2 border-yellow-50 text-yellow-50 bg-yellow-800") :
                            ("text-richblack-300 ")}`}>
                            <div>
                    
                              <div className='text-lg text-richblack-300
                              group-hover:  group-hover:text-yellow-300 transition-all duration-200'>
                                <FiLogOut></FiLogOut>
                              </div>
                    
                            </div>
                            <div>
                              Log Out
                            </div>
                    
                          </div>
                    
                    
                    
                            {
                        modal
                        &&
                        <ConfirmationModal
                          onClickBtn1={() => { dispatch(logout(navigate)) }} onClickBtn2={() => { setModal(false) }}
                          setModal
                          text1={"Are you sure?"}
                          text2={"You will be logged out of your account."}
                          btn1={"Log Out"}
                          btn2={"Cancel"} />
                     
                     }
                {/* // )) */}
                     </div> 
                  
            }
                 
        </div>
    )
}

export default SidebarModal