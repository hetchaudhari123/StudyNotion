import React from 'react'
import image from "../../../assets/Logo/Logo-Full-Light.png"
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <div>
            <div className=''>
                {/* Left */}
                <div className='w-1/2 flex flex-col justify-start'>
                    <div className='gap-3 flex flex-col'>
                        <div>
                            <div>
                                <img src={image} alt="StudyNotion Logo" />
                            </div>

                            <div className='font-inter text-base font-semibold leading-6 text-left text-richblack-100'>
                                Company
                            </div>

                            <div className='flex flex-col gap-2 font-inter text-sm font-normal leading-6 text-left text-richblack-400'>
                                <div>About</div>
                                <div>Careers</div>
                                <div>Affiliates</div>
                            </div>
                            <div className='flex flex-row gap-3 text-lg text-richblack-400 '>
                                <FaFacebook />
                                <FaGoogle />
                                <FaTwitter />
                                <FaYoutube />
                            </div>
                        </div>
                        <div>
                            <div className='flex flex-col gap-3'>
                                <div className='font-inter text-base font-semibold leading-6 text-left text-richblack-100'>Resources</div>
                                <div>
                                    <div>Articles</div>
                                    <div>Blog</div>
                                    <div>Chart Sheet</div>
                                    <div>Code challenges</div>
                                    <div>Docs</div>
                                    <div>Projects</div>
                                    <div>Videos</div>
                                    <div>Workspaces</div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='text-richblack-100 font-inter text-base font-semibold leading-6 text-left'>Support</div>
                                <div className='font-inter text-sm font-normal leading-6 text-left text-richblack-400'>Help Center</div>
                            </div>
                        </div>
                        <div>
                            <div className='flex flex-col gap-3'>
                                <div className='text-richblack-100 font-inter text-base font-semibold leading-6 text-left'>Plans</div>
                                <div className='flex flex-col gap-2 text-richblack-400 font-inter text-sm font-normal leading-6 text-left'>
                                    <div>Paid memberships</div>
                                    <div>For students</div>
                                    <div>Business solutions </div>
                                </div>
                            </div>
                            <div>
                                <div className='font-inter text-base font-semibold leading-6 text-left text-richblack-100'>Community</div>
                                <div className='text-richblack-400 font-inter text-sm font-normal leading-6 text-left'>
                                    <div>Forums</div>
                                    <div>Chapters</div>
                                    <div>Events</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className='w-1/2'></div>
                {/* Border */}
                <div>

                </div>
            </div>
            <div></div>
        </div>
    )
}
