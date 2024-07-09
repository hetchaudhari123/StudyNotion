import CTAButton from "./Button"
import HighlightText from "./HighlightText"
import { FaArrowRightLong } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';
export default function CodeBlocks({
    heading, content, ctabtn1, ctabtn2, index, code, position, codeColor, backColor
}) {
    return (
        <div className={`flex flex-col gap-14 xl:gap-0 xl:flex-row   ${position}  text-white justify-between w-11/12 mx-auto `}>
            {/* Left Div */}
            {/* 90px, 120px, 90px, 120px */}
            <div className="w-full xl:w-1/2 flex flex-col gap-3 ">
                <div className="flex flex-col gap-2  xl:gap-4">
                    <div>
                    {heading}
                    </div>
                    <div className="font-medium text-base leading-6 text-[#838894]">
                        {content}
                    </div>
                    <div className="pt-10 xl:pt-14 flex gap-6">
                        <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
                            <div className="flex items-center text-center gap-2 font-medium text-base leading-6">
                                {ctabtn1.content}
                                <FaArrowRightLong />
                            </div>
                        </CTAButton>
                        <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
                            <div className="flex items-center text-center gap-2">
                                {ctabtn2.content}
                            </div>
                        </CTAButton>

                    </div>
                </div>
            </div>
            {/* Right Div */}


            <div className=' h-fit flex flex-row w-[100%] py-4 xl:w-[500px]  bg-custom-gradient-code-blocks relative'>
                <div className={` absolute ${backColor ? ("codeblock1") : ("codeblock2")}`}></div>
                <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                    <TypeAnimation
                        sequence={[code, 2000, ""]}
                        repeat={Infinity}
                        cursor={true}

                        style={
                            {
                                whiteSpace: "pre-line",
                                display: "block",
                            }
                        }
                        omitDeletionAnimation={true}
                    />
                </div>

            </div>
        </div>
    )
}
