import React, { useState } from 'react'
import * as Icons from "react-icons/vsc"
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
const SidebarLink = ({ type, icon, text, path,modal  }) => {
  const Icon = Icons[icon];
  const location = useLocation();
  const { user } = useSelector((state) => state.profile);
  const matchPath = () => {
    return (path === location.pathname);
  }
  return (
    // IMPORTANT -> UNCOMMENT THIS AND COMMENT THE FOLLOWING LINE!
    // (!type || user["accountType"] === type) && (< Link to={path} >
    (< Link to={path} >
      <div className={`cursor-pointer flex flex-row  items-center font-inter text-sm font-medium leading-6 text-left py-2 px-6 gap-3 bg-richblack-800 ${(matchPath() && !modal) ? ("border-l-2 border-yellow-50 text-yellow-50 bg-yellow-800") :
        ("text-richblack-300 ")}`}>
        <div>

          <Icon className={`text-lg text-richblack-300`}></Icon>
        </div>
        <div>
          {text}
        </div>

      </div>

    </Link >)
      
  )
}

export default SidebarLink