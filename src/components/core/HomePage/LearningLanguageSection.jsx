import HighlightText from "./HighlightText"
import img1 from "../../../assets/Images/Know_your_progress.png"
import img2 from "../../../assets/Images/Compare_with_others.png"
import img3 from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./Button"
export default function LearningLanguageSection() {
    return (
        <div className=" flex flex-col xl:py-24 xl:px-32 w-11/12 max-w-maxContent  gap-14 mx-auto ">
            {/* <div className="flex flex-col py-24 px-32  gap-[14] "> */}
            <div className="flex flex-col gap-4">
                <div className="font-inter text-4xl font-semibold leading-10 tracking-tight text-center">Your swiss knife for <HighlightText text={"learning any language"}></HighlightText>
                </div>
                <div className="font-inter text-base font-medium leading-6  text-center text-richblack-700">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>
            </div>

            <div className="flex flex-col items-center xl:flex-row justify-center ">
                <img src={img1} alt="Know your progress image" className="object-contain w-[20rem] xl:w-auto xl:h-auto" />
                <img src={img2} alt="Compare with others image" className="object-contain w-[20rem] xl:w-auto xl:h-auto xl:ml-[-10rem] xl:mr-[-11rem]" />
                <img src={img3} alt="Plan your lessons image" className="object-contain w-[20rem] xl:w-auto xl:h-auto " />
            </div>
            <div className="flex gap-6 pt-9 max-h-20 justify-center items-end ">
                {/* <div className="flex w-full border-2 border-black"> */}
                <CTAButton active={true} linkto={"/signup"}>
                    <p className="font-inter text-base font-bold leading-6 text-center">Learn More
                    </p>
                </CTAButton>
            </div>
        </div>
    )
}