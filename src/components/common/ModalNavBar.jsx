import React, { useEffect, useState,useRef } from 'react'
import { NavbarLinks } from '../../data/navbar-links'
import { Link, useLocation } from 'react-router-dom'
import { IoIosArrowDropdownCircle } from "react-icons/io"
import { useLocalStorage } from '@uidotdev/usehooks'

const ModalNavBar = ({navVis,setNavVis,onLinkClick, subLinks, title1, title2, path1, path2,
 }) => {
    const navbarRef = useRef(null);
    // const {token} = useSelector(state=>state.auth);
    const [openCatalog,setOpenCatalog] = useState(false);
    const location = useLocation()
    const handleClickOutside = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            // console.log("hey\n");
          setNavVis(false);
        }
      };
    
      useEffect(() => {
        
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

      const matchPath = (ele) => {
        
        if(location.pathname === ele.path){
            return true
        }
        return false
      }

    return (
        
    //     <div 
    //     ref={navbarRef}
    //     className={`bg-white flex flex-col h-screen fixed right-0 top-0
    // md:w-[300px]
    // backdrop-blur-md
    // z-50
    // bg-opacity-20
    // p-8
    // `}>
        <div 
        ref={navbarRef}
        className={`flex flex-col 
    h-screen fixed right-0 top-0
    backdrop-blur-md
     md:w-[300px]
    z-50
    bg-richblack-700
    bg-opacity-20
     p-8  gap-3 border border-richblack-700
    `}>
            {
                NavbarLinks.map((ele, index) => (

                     <div className={`cursor-pointer flex flex-row  items-center font-inter text-sm font-medium leading-6 text-left py-2 px-6 gap-3 transition-all duration-200 rounded-lg group hover:bg-yellow-700 hover:text-yellow-300 
                        ${(matchPath(ele)) ? ("border-l-2 border-yellow-50 text-yellow-50 bg-yellow-800") :
      ("text-richblack-300 ")}`}
                     // <div className={` font-inter 
                        
                    // w-full
                    // flex justify-start
                    // text-base font-normal 
                    // leading-6 text-center py-1 px-3 gap-1 group
                    
                    // `} 
                     key={index}>

                        {
                            (ele.title === "Catalog") ? (
                                <div 
                                onClick={() => setOpenCatalog(prev => !prev)}
                                className='flex flex-col items-center  cursor-pointer relative 
                                '>
                                    {/* <div className='group border-2 border-blac'> */}
                                    <div className='flex flex-row items-center gap-2 cursor-pointer  relative'>

                                        <div className='  text-yellow-50'>
                                            {ele.title}
                                        </div>
                                        <div className='text-richblack-25'>
                                            <IoIosArrowDropdownCircle />
                                        </div>
                                    </div>



                                    {/* For showing it below */}
                                    {
                                    openCatalog &&
                                    <div className=' text-richblack-25 flex flex-col 
                                    
                                    '>

                                    {
                                            (subLinks.length ? (
                                                // {
                                                subLinks.map((ele, index) => {
                                                    // ele is an object
                                                    return (

                                                        <Link to={ele.link}
                                                        className=''
                                                        key={index}
                                                        >
                                                            <div  onClick={() => setNavVis(false)} className='
                                                            flex flex-col py-1 px-3 gap-1
                                                            hover:text-yellow-50 
                                                             ' >
                                                                <p className=' text-left'>
                                                                    {ele.name}
                                                                </p>

                                                            </div>
                                                        </Link>
                                                    )
                                                })
                                            ) : (<div >
                                                <div className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50' >
                                                    <p className=' text-left'>
                                                        No Catalog Yet!
                                                    </p>

                                                </div>
                                            </div>)
                                            )

                                    }
                                    </div>
                                    }


                                    {/* For showing the dialog box */}
                                    {/* <div className='z-10 absolute 
                                    rounded-md
                                    invisible 
                                    opacity-0
                                    bg-richblack-5 p-4 text-richblack-900  
                                    lg:w-[300px] top-0 translate-y-[20%] right-0 translate-x-[6.32rem]    
                                    group-hover:visible group-hover:opacity-100 
                                    transition-all duration-200 
                                    group-hover:translate-y-[2rem]'>
                                        <div className='select-none bg-richblack-5 rounded absolute h-6 w-6 -z-10  origin-center rotate-45 top-0 right-[6rem] translate-y-[-0.5rem]'>
                                        </div>

                                
                                        {
                                            subLinks.length ? (
                                                // {
                                                subLinks.map((ele, index) => {
                                                    // ele is an object
                                                    return (

                                                        <Link to={ele.link}
                                                        
                                                        key={index}
                                                        >
                                                            <div  onClick={() => setNavVis(false)} className='
                                                            
                                                            rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50' >
                                                                <p className=' text-left'>
                                                                    {ele.name}
                                                                </p>

                                                            </div>
                                                        </Link>
                                                    )
                                                })
                                            ) : (<div >
                                                <div className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50' >
                                                    <p className=' text-left'>
                                                        No Catalog Yet!
                                                    </p>

                                                </div>
                                            </div>)

                                        }
                                    </div> */}

                                </div>
                            ) : (
                                <Link to={ele.path} >

                                    <div onClick={onLinkClick} className='hover:text-yellow-50 cursor:pointer  text-richblack-25 '>
                                        {ele.title}
                                    </div>
                                </Link>

                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default ModalNavBar