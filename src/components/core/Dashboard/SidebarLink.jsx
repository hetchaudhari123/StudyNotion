import React, { useState } from 'react'
import * as Icons from "react-icons/vsc"
import * as FiIcons from "react-icons/fi"
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
const SidebarLink = ({ type, icon, text, path,modal,iconChoose = false,onLogOutClick  }) => {
  const Icon = (!iconChoose) ? Icons[icon] : FiIcons[icon];
  const location = useLocation();
  const { user } = useSelector((state) => state.profile);
  const matchPath = () => {
    return (path === location.pathname);
  }

 

  return (
    // IMPORTANT -> UNCOMMENT THIS AND COMMENT THE FOLLOWING LINE!
    // (!type || user["accountType"] === type) && (< Link to={path} >
    (!onLogOutClick ? (< Link to={path} > 
      {/* <div className={`cursor-pointer flex flex-row  items-center font-inter text-sm font-medium leading-6 text-left py-2 px-6 gap-3 bg-richblack-800 ${(matchPath() && !modal) ? ("border-l-2 border-yellow-50 text-yellow-50 bg-yellow-800") : */}
      <div className={`cursor-pointer flex flex-row  items-center font-inter text-sm font-medium leading-6 text-left py-2 px-6 gap-3 transition-all duration-200 rounded-lg group hover:bg-yellow-700 hover:text-yellow-300 ${(matchPath() && !modal) ? ("border-l-2 border-yellow-50 text-yellow-50 bg-yellow-800") :
        ("text-richblack-300 ")}`}>
        <div>
          <Icon className={`text-lg text-richblack-300 group-hover:  group-hover:text-yellow-300 transition-all duration-200`}></Icon>
        
        
        </div>
        <div>
          {text}
        </div>

      </div>

    </Link >):
    (
    <div onClick={onLogOutClick}> 
    {/* <div className={`cursor-pointer flex flex-row  items-center font-inter text-sm font-medium leading-6 text-left py-2 px-6 gap-3 bg-richblack-800 ${(matchPath() && !modal) ? ("border-l-2 border-yellow-50 text-yellow-50 bg-yellow-800") : */}
    <div className={`cursor-pointer flex flex-row  items-center font-inter text-sm font-medium leading-6 text-left py-2 px-6 gap-3 transition-all duration-200 rounded-lg group hover:bg-yellow-700 hover:text-yellow-300 ${(matchPath() && !modal) ? ("border-l-2 border-yellow-50 text-yellow-50 bg-yellow-800") :
      ("text-richblack-300 ")}`}>
      <div>
        <Icon className={`text-lg text-richblack-300 group-hover:  group-hover:text-yellow-300 transition-all duration-200`}>
          
        </Icon>
      
      
      </div>
      <div>
        {text}
      </div>

    </div>

  </div >
    ))
      
  )
}

export default SidebarLink