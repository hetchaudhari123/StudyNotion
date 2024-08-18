import React from 'react'
import Banner1 from "../assets/Images/aboutus1.webp"
import Banner2 from "../assets/Images/aboutus2.webp"
import Banner3 from "../assets/Images/aboutus3.webp"
import Quote from "../components/core/Aboutus/Quote"
import foundingImage from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/Aboutus/StatsComponent'
import HighlightText from '../components/core/HomePage/HighlightText'
import LearningGrid from '../components/core/Aboutus/LearningGrid'
import ContactUsForm from '../components/core/Aboutus/ContactUsForm'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'
import Reviews from '../components/common/Reviews'
const Aboutus = () => {
    return (
        // <div className='w-11/12 max-w-maxContent mx-auto'>
        <div>
            <section className='w-11/12 max-w-maxContent mx-auto lg:h-[618px] pt-20 xl:px-32 flex flex-col gap-14 text-richblack-800 bg-richblack-800'>

                {/* <div className='w-full pt-20 px-32 flex flex-col gap-14 text-richblack-800'> */}
                <div className='flex flex-col gap-10 '>
                    <div className='pt-1 gap-1.5 rounded-full w-full flex justify-center'>
                        <div className='py-1.5 px-5 flex gap-2.5 rounded-full'>
                            <p className='text-richblack-200 font-inter text-base font-medium leading-6 text-center'>
                                About us
                            </p>
                        </div>
                    </div>

                    <div className='mx-auto  lg:w-[913px]  flex flex-col xl:px-14 gap-4'>
                        <div className='text-richblack-5 font-inter text-4xl font-semibold leading-10 tracking-tight text-center'>Driving Innovation in Online Education for a
                            <HighlightText text={"Brighter Future"}></HighlightText></div>

                        <div className=' lg:h-[72px] lg:w-[809px] font-inter text-base font-normal leading-6 text-center text-richblack-300'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</div>
                    </div>
                </div>
                {/* </div> */}
                <div className='flex  flex-col items-center lg:flex-row gap-6'>
                    <div>
                        <img src={Banner1} alt="Banner1 image" className='lg:w-[384px] lg:h-[311px] object-contain' />
                    </div>
                    <div>
                        <img src={Banner2} alt="Banner2 image" className='lg:w-[384px] lg:h-[311px] object-contain' />
                    </div>
                    <div>
                        <img src={Banner3} alt="Banner3 image" className='lg:w-[384px] lg:h-[311px] object-contain' />
                    </div>
                </div>
            </section>
            <section className='flex justify-center xl:w-[1440px] mx-auto text-center py-24 px-32  gap-2.5 rounded-sm border-b-2 border-richblack-700'>
                <Quote></Quote>
            </section>

            <section className=' w-full flex flex-col  px-4 py-4 lg:py-24 lg:px-32  xl:flex-row gap-24 justify-between'>

                <div className='flex flex-col gap-6  xl:w-[486px]'>
                    <div className='font-inter text-4xl font-semibold leading-10 tracking-tight text-left' style={{
                        background: 'linear-gradient(117.95deg, #833AB4 -2.4%, #FD1D1D 52.25%, #FCB045 106.89%)', WebkitBackgroundClip: 'text',
                        color: 'transparent'
                    }}>
                        Our Founding Story
                    </div>
                    <div className='flex flex-col gap-4'>
                        <p className='font-inter text-base font-medium leading-6 text-left text-richblack-300'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p className='font-inter text-base font-medium leading-6 text-left text-richblack-300'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>

                </div>
                <div className='flex gap-0.5 p-8 justify-center items-center '>


                    <img src={foundingImage}
                        style={{
                            border: '1px solid',
                            borderImageSource: 'linear-gradient(121.74deg, rgba(255, 255, 255, 0.22) -7.75%, rgba(255, 255, 255, 0) 37.38%)'
                        }}
                        className='object-contain flex p-2 gap-2 ' alt="Founding story image" />


                </div>
            </section>
            {/* width: Fixed (1,440px)px;--
height: Hug (416px)px;--
top: 1645px;--
padding: 90px 120px 90px 120px;--
gap: 98px;--
opacity: 0px;
 */}
            <section className='flex flex-col lg:flex-row justify-between py-4 px-4 lg:py-24 lg:px-32 gap-24 items-center'>
                {/* 24px */}
                <div className='flex flex-col gap-6 xl:w-[486px] '>
                    {/* Fixed (486px) */}
                    <div className=' font-inter text-4xl font-semibold text-left tracking-tight leading-10' style={{background: 'linear-gradient(118.41deg, #E65C00 -6.05%, #F9D423 106.11%)',WebkitBackgroundClip: 'text',
                        color: 'transparent'
}}>Our Vision</div>

                    <div className='font-inter text-base leading-6 text-left font-medium flex gap-4 text-richblack-300'>
                    With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                    </div>
                </div>
                {/* 24px */}
                <div className=' flex flex-col gap-6 xl:w-[486px]'>
                  {/* background: linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%);
 */}
                    <div style={{background: 'linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)',WebkitBackgroundClip: 'text',
                        color: 'transparent'
}} className='font-inter tracking-tight text-left font-semibold text-4xl leading-10'>
                    Our Mission
                    </div>
                    
                    <div className='flex gap-4 font-inter text-base font-medium leading-6 text-left text-richblack-300'>
                    Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                    </div>
                </div>
            </section>
            {/* width: Fixed (1,440px)px;--
height: Hug (254px)px;--
top: 2061px;--
padding: 90px 120px 90px 120px;--
gap: 10px;--
border: 0px 0px 1px 0px;
opacity: 0px;
 */}
 {/* border-bottom: 1px solid #2C333F */}
            <section className=''>

                <StatsComponent/>

            </section>
            <section className='py-4 px-4 md:py-24 md:px-32'>
              <LearningGrid></LearningGrid>
            </section>
            <section >
                <ContactUsForm></ContactUsForm>
            </section>
            
            {/* <div className="p-20 flex flex-col gap-20">
                <div className="flex flex-row justify-center text-richblack-5 font-inter text-4xl font-semibold leading-10 tracking-tight text-left w-full  ">
                    Reviews from other learners
                </div>
                <ReviewSlider></ReviewSlider>
            </div> */}
            <Reviews></Reviews>
            <Footer></Footer>
        </div>

    )
}

export default Aboutus