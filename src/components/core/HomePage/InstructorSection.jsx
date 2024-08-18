import instructorImage from "../../../assets/Images/Instructor.png"
import CTAButton from "./Button"
import { FaArrowRightLong } from "react-icons/fa6";
import HighlightText from "./HighlightText";
export default function InstructorSection() {
    return (
        // 90px, 120px, 90px, 120px
        // 90px, 120px, 90px, 120px
        <div className=" w-11/12 my-20 max-w-maxContent mx-auto flex 
          gap-24 flex-col items-center xl:flex-row ">
            <div className="xl:w-1/2">
                <img src={instructorImage} alt="Instructor Image" className="instructor-image object-cover" />
            </div>
            <div className="flex items-center xl:w-1/2  ">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-4 ">
                        <div className="font-inter text-4xl font-semibold leading-10 tracking-tight text-left w-full xl:w-[50%] ">
                            Become an
                            <HighlightText text="Instructor">
                            </HighlightText>
                        </div>
                        <div className="font-inter text-base font-medium leading-6 text-left text-richblack-300">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.

                        </div>
                    </div>
                    <div className="flex justify-center xl:justify-start pt-12">

                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="flex items-center gap-2">
                                {/* <p className="font-inter text-base font-medium leading-6 text-center text-richblack-900"> */}
                                <div className="font-inter font-bold text-base leading-6 text-center text-[#000814]">

                                    Start Learning Today
                                {/* </p> */}
                                </div>
                                <FaArrowRightLong />
                            </div>
                        </CTAButton>
                    </div>

                </div>
            </div>
        </div>
    )
}