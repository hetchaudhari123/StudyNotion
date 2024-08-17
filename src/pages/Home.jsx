import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
import Reviews from "../components/common/Reviews";
const Home = () => {
    return (
        <div>
            {/* Section1 */}
            <div className="flex flex-col mx-auto justify-center items-center w-11/12 text-white gap-y-9  ">
                <div className="mt-16 bg-richblack-800 rounded-full  transition-all duration-200 hover:scale-95 w-fit shadow-login-btn-become-an-instructor group py-[1px] px-[0.5px] ">
                    <Link to={"/signup"}>

                        <div className=" flex gap-x-[10px] items-center group-hover:bg-richblack-900  rounded-full py-1.5 px-4  ">

                            <p className="flex justify-center font-medium leading-6 text-base items-[center]">Become an instructor</p>
                            <FaArrowRightLong></FaArrowRightLong>

                        </div>
                    </Link>
                </div>
                <div className="text-3xl text-center leading-10 font-semibold">
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"} />
                </div>
                <div className="font-medium text-base leading-6 text-center text-[#838894] w-[60%] ">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>
                <div className="flex gap-6">

                    <CTAButton active={true} linkto={"/signup"} >
                        <div className="font-inter text-base font-medium leading-6 text-center"></div>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        <div className="font-inter text-base font-medium leading-6 text-center">

                            Book A Demo
                        </div>
                    </CTAButton>
                </div>

                <div className="xl:w-[90%] mx-auto relative
                 shadow-[10px_-5px_50px_-5px] shadow-blue-200 ">
                    <div className="xl:video-circle xl:absolute xl:top-[50%] xl:translate-y-[-50%] xl:left-[50%] xl:translate-x-[-50%]"></div>
                    <video  loop autoPlay className="shadow-[20px_20px_rgba(255,255,255)]">
                        <source src={Banner} type="video/mp4" />

                    </video>
                </div>
                {/* <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200 ">
                    <video
                        className="shadow-[20px_20px_rgba(255,255,255)]"
                        muted
                        loop
                        autoPlay
                    >
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div> */}

            </div>

            {/* Code Section1 */}
            {/* <div className="w-full border-2 border-white mt-[4rem]"> */}
            <div className="w-11/12  mx-auto mt-[10rem]">
                <CodeBlocks
                    heading={
                        <div className="font-semibold text-4xl leading-10">
                            Unlock your <HighlightText text="coding potential"></HighlightText> with our online courses.
                        </div>
                    }
                    content=
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."

                    ctabtn1={{ active: true, content: "Try it Yourself", link: "/signup" }}
                    ctabtn2={{ active: false, content: "Learn More", link: "/login" }}
                    code={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav>\n<a href="one/">One</a>`}

                    index={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
                    position="xl:flex-row"
                    codeColor="text-[#E7BC5B]"
                    backColor={true}
                ></CodeBlocks>
            </div>
            {/* Section2 */}
            {/* <div className="w-full mt-[4rem]"> */}
            <div className="w-11/12 mx-auto mt-[4rem]">
                <CodeBlocks
                    heading={
                        <div className="font-semibold text-4xl leading-10">
                            Unlock your <HighlightText text="coding potential"></HighlightText> with our online courses.
                        </div>
                    }
                    content=
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."

                    ctabtn1={{ active: true, content: "Try it Yourself", link: "/signup" }}
                    ctabtn2={{ active: false, content: "Learn More", link: "/login" }}
                    code={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav>\n<a href="one/">One</a>`}

                    index={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
                    position="xl:flex-row-reverse"
                    codeColor="text-[#E7BC5B]"
                    backColor={false}
                ></CodeBlocks>
                <div className=" gap-24 py-8 px-4 xl:py-24 xl:px-32">
                    <ExploreMore></ExploreMore>
                </div>

            </div>
            {/* Section2 */}
            <div className=" bg-pure-greys-5 ">
                <div className="homepage_bg ">
                    <div className="h-80 flex flex-col justify-center xl:justify-between">
                        <div></div>
                        <div className=" flex  xl:mb-8  justify-center items-center gap-6  ">

                            {/* <CTAButton active={true}

>                   
                                <div className="flex font-inter font-bold text-base leading-6 text-center gap-2 items-center">
                                    Explore Full Catalog
                                    <FaArrowRightLong />
                                </div>
                            </CTAButton> */}
                            {/* <CTAButton linkto={"/login"} active={false} >
                                <div className="flex font-inter font-bold text-base leading-6 text-center gap-2 items-center">
                                    Learn More
                                </div>
                            </CTAButton> */}
                            <CTAButton linkto={"/login"} active={true} >
                                <div className="flex font-inter font-bold text-base leading-6 text-center gap-2 items-center">
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className="w-11/12 max-w-maxContent mx-auto justify-between gap-14 flex flex-col py-14  ">
                    <div className="flex flex-col gap-7 xl:flex-row xl:gap-0">
                        <div className="font-inter text-3xl font-semibold leading-10 tracking-tight w-full xl:w-1/2 text-center xl:text-left">
                            <p>
                                Get the skills you need for a
                                <HighlightText text={"job that is in demand."} />
                            </p>
                        </div>
                        <div className="font-inter text-base font-medium leading-6  w-full xl:w-1/2 text-center xl:text-left justify-between h-36 flex flex-col">
                            <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <div className="flex justify-center xl:justify-start items-start">
                                <CTAButton active={true} linkto={"/signup"}>
                                    <div className="font-inter font-bold text-base leading-6 text-center text-[#000814]">
                                        Learn More
                                    </div>
                                </CTAButton>
                            </div>
                        </div>
                    </div>
                    <TimelineSection></TimelineSection>
                    <LearningLanguageSection />
                </div>
            </div>
            {/* Section 3 */}
            <div class="text-richblack-5 ">
                <InstructorSection />
            </div>
            {/* <div className="p-20 flex flex-col gap-20">
                <div className="flex flex-row justify-center text-richblack-5 font-inter text-4xl font-semibold leading-10 tracking-tight text-left w-full  ">
                    Reviews from other learners
                </div>
                <ReviewSlider></ReviewSlider>
            </div> */}
            <Reviews></Reviews>
            {/* Footer */}
            <Footer />
        </div>
    )
}
export default Home;