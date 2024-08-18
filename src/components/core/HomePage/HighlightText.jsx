export default function HighlightText({text,customClass}){
    return (
        <span className={`${customClass} bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold`}>
            {" "}
            {text}
        </span>
    
    )
}