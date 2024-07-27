import React from 'react'
import image from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links'
import { Link } from 'react-router-dom'
import { IoIosArrowDropdownCircle } from "react-icons/io"
import { useEffect, useState } from 'react'
import { categories } from '../../services/apis_by_me'
import apiConnector from '../../services/apiconnector'
import { useSelector } from 'react-redux'
import { FiShoppingCart } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { useMediaQuery } from "@uidotdev/usehooks";
import { GiHamburgerMenu } from "react-icons/gi";
import ModalNavBar from './ModalNavBar'
export default function Navbar({navVis,setNavVis,subLinks,setSubLinks}) {
    const { token } = useSelector(state => state.auth);
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    // console.log(categories.CATEGORIES_API);
    const getSubLinks = async () => {
        const response = await apiConnector('GET', categories.CATEGORIES_API);
        //Putting a new property of link inside the response.data.data
        const updatedResponse = response.data.data.map((ele, index) => {
            const name = ele.name.replace(/[\s/]+/g, '-').toLowerCase();
            // return { ...ele, link: `${'/catalog/' + ele.name}` }
            return { ...ele, link: `${'/catalog/' + name}` }
        })
        // setSubLinks(response.data.data);
        setSubLinks(updatedResponse);
    }
    useEffect(() => {
        getSubLinks();
    }, []);



    return (

        <div className='  border-b border-richblack-700
        
         '>
            {true ? (
                <div className='text-richblack-5 flex justify-end w-full px-6'>
                    <div className='cursor-pointer'
                    
                    onClick={() => setNavVis(true)}>
                        <div className='p-4 hover:bg-richblack-700
                        transition-all duration-200 rounded-[200px]'>   
                            <GiHamburgerMenu size={24}/>
                        </div>
                  
                    </div>
                </div>
            ) : (
                <div className='w-11/12 max-w-maxContent mx-auto lg:py-3 lg:px-16  lg:max-w-full lg:w-full xl:px-32 gap-8  flex flex-row justify-between items-center'>
                <div className=''>
                    <Link to={"/"}>
                        <img src={image} alt="Logo Image" />
                    </Link>
                </div>
                <div className=''>

                    <nav 
                    className={`${ "flex items-center "
                    }`}>

                        {

                            NavbarLinks.map((ele, index) => {
                                return (
                                    <div className={` font-inter 
                                    
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
                                                    bg-richblack-5 p-4 text-richblack-900  lg:w-[300px] top-0 translate-y-[20%] right-0 translate-x-[6.32rem]    group-hover:visible group-hover:opacity-100 transition-all duration-200 group-hover:translate-y-[2rem]'>
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
                                                                        <Link to={ele.link} key={index}>
                                                                            <div className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50' >
                                                                                <p className=' text-left'>
                                                                                    {ele.name}
                                                                                </p>

                                                                            </div>
                                                                        </Link>
                                                                    )
                                                                })
                                                                // }
                                                            ) : (<div></div>)

                                                        }
                                                    </div>
                                                </div>
                                            ) : (
                                                <Link to={ele.path}>

                                                    <div className='cursor:pointer  text-richblack-25 '>
                                                        {ele.title}
                                                    </div>
                                                </Link>

                                            )
                                        }
                                    </div>

                                )

                            })

                        }
                    </nav>
                </div>
                {
                    (token === null) ?
                        (


                            <div className='flex gap-x-4'>
                                <Link to="/login">
                                    <div className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md text-richblack-5 transition-all duration-200'>
                                        Login
                                    </div>
                                </Link>
                                <Link to="/signup">
                                    <div className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md text-richblack-5 transition-all duration-200'>
                                        Sign Up
                                    </div>
                                </Link>
                            </div>
                        ) :
                        (
                            <div className='flex flex-row gap-5'>
                                {/* <div className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md text-richblack-5 transition-all duration-200'> */}
                                <FiSearch />
                                {/* </div> */}
                                {/* <div className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md text-richblack-5 transition-all duration-200'> */}
                                <div className='flex flex-col justify-center text-2xl   text-richblack-5'>
                                    <Link to="/wishlist">

                                        <FiShoppingCart />
                                    </Link>
                                </div>
                                {/* </div> */}
                                <Link to="/dashboard">
                                    <div className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md text-richblack-5 transition-all duration-200'>
                                        Profile
                                    </div>
                                </Link>
                            </div>
                        )
                }
            </div>
            )}

            {/* <div className=' mx-auto w-11/12 max-w-maxContent xl:mx-auto xl:py-3 xl:px-32 gap-8  flex flex-row justify-between items-center'> */}
            
        </div>
    )
}

