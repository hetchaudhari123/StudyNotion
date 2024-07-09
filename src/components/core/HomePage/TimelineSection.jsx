import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import image from "../../../assets/Images/TimelineImage.png"
export default function TimelineSection() {
    const timelineData = [
        {
            icon: Logo1,
            heading: "Leadership",
            content: "Fully committed to the success company"
        },
        {
            icon: Logo2,
            heading: "Responsibility",
            content: "Students will always be our top priority"
        },
        {
            icon: Logo3,
            heading: "Flexibility",
            content: "The ability to switch is an important skills"
        },
        {
            icon: Logo4,
            heading: "Solve the problem",
            content: "Code your way to a solution"
        }
    ];
    return (
        <div className="flex flex-col xl:flex-row items-center gap-10 ">
            {/* Left */}
            <div className=" flex flex-col gap-8 w-full xl:w-[40%] items-center  xl:items-start">
                <div className="flex flex-col gap-8 w-fit ">

                    {
                        timelineData.map((ele, index) => {
                            return (
                                <div key={index} className="flex justify-center gap-6  xl:gap-6
                            xl:justify-start  items-center">
                                    <div className="flex items-center p-[1rem] rounded-[50%] gap-1 h-14 w-14 justify-center bg-white">
                                        {/* <div className=" w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]"> */}
                                        {/* Icon */}
                                        <img src={ele.icon} alt="Logo" className="object-contain " />
                                        {/* <img src={ele.icon} alt="Logo"  /> */}
                                    </div>
                                    {/* <div className="w-[60%] xl:w-auto"> */}
                                    <div className="w-[60%] xl:w-auto">
                                        <div className="font-inter text-lg font-semibold leading-7 text-left">
                                            {/* heading */}
                                            {ele.heading}
                                        </div>
                                        <div className="font-inter text-sm font-normal leading-6 text-left text-[#2C333F]">
                                            {/* Content */}
                                            {ele.content}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            {/* Right */}
            <div className="xl:w-[60%] relative ">
                <div className="xl:timeline-section-circle xl:absolute xl:top-[50%]  xl:translate-y-[-50%] xl:left-[50%] xl:translate-x-[-50%] "></div>
                {/* <div className="h-fit w-fit relative "> */}
                {/* <div className="h-[400px] w-[600px] relative "> */}
                <div className=" relative ">
                    <img src={image} alt="Girl using computer" className="object-contain h-full w-full " />
                    {/* <div className="bg-caribbeangreen-700 flex p-10 gap-12 max-w-lg max-h-32 absolute left-[50%] translate-x-[-50%] translate-y-[-50%] "> */}
                    <div className="bg-caribbeangreen-700 flex p-0 md:p-5 xl:p-10   gap-0 md:gap-4 xl:gap-12  absolute top-0 xl:top-auto xl:left-[50%] xl:translate-x-[-50%]  xl:translate-y-[-50%] flex-col xl:flex-row">
                        <div className=" xl:w-1/2 gap-6 font-inter   leading-10 tracking-tight text-center flex items-center  justify-center   ">
                            <div className="text-white font-inter text-3xl md:text-4xl font-bold leading-10 tracking-tight text-center">10</div>
                            <div className="text-caribbeangreen-300 font-inter text-sm font-medium leading-6 text-left ">YEARS
                                EXPERIENCES</div>
                        </div>
                        <div className="xl:bg-caribbeangreen-500 xl:w-px xl:h-11 "></div>
                        <div className="text-2xl md:text-4xl xl:w-1/2 gap-6 font-inter  font-bold leading-10 tracking-tight text-center flex items-center  justify-center">
                            <div className="text-white font-inter text-3xl md:text-4xl font-bold leading-10 tracking-tight text-center ">250</div>
                            <div className="text-caribbeangreen-300 font-inter text-sm font-medium leading-6 text-left ">TYPES OF
                                COURSES</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}