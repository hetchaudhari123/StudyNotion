import React, { useEffect, useState,useRef } from 'react'
import { NavbarLinks } from '../../data/navbar-links'
import { Link } from 'react-router-dom'
import { IoIosArrowDropdownCircle } from "react-icons/io"

const ModalNavBar = ({navVis,setNavVis,onLinkClick, subLinks, title1, title2, path1, path2 }) => {
    const navbarRef = useState(null);
    const arr = [...NavbarLinks, {
        title: title1,
        path: path1,
    }, {
        title: title2,
        path: path2
    }]

    const handleClickOutside = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
          setNavVis(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);



    return (
        
        <div 
        ref={navbarRef}
        className={`bg-white flex flex-col h-screen fixed right-0 top-0
    md:w-[300px]
    backdrop-blur-md
    z-50
    bg-opacity-20
    `}>
            {
                arr.map((ele, index) => (
                    <div className={` font-inter 

                    
                    w-full
                    flex justify-start
                    text-base font-normal 

                       
                    
                    leading-6 text-center py-1 px-3 gap-1 group`} key={index}>
                        {
                            (ele.title === "Catalog") ? (
                                <div className='flex flex-row items-center gap-2 cursor-pointer  relative  '>
                                    {/* <div className='group border-2 border-blac'> */}
                                    <div className='  text-yellow-50'>
                                        {ele.title}
                                    </div>
                                    <div className='text-richblack-25'>
                                        <IoIosArrowDropdownCircle />
                                    </div>

                                    {/* </div> */}
                                    {/* <div className='invisible group-hover:visible text-white absolute'> */}
                                    <div className='z-10 absolute 
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

                                        {/* <div className='   absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900  transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]" '> */}
                                        {/* Fetch using showAllCategories */}
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
                                    </div>
                                </div>
                            ) : (
                                <Link to={ele.path} >

                                    <div onClick={onLinkClick} className=' cursor:pointer  text-richblack-25 '>
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