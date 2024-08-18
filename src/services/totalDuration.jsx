export const totalDuration = (course) => {
    let time = 0
    console.log("COURSE.....",course)
    course.courseContent.forEach((section) => {
        console.log("SECTION....",section)
        section.subSection.forEach((subsection) => {
            // console.log()
            time += Number(subsection.timeDuration)
        })
    })
    console.log("time...",time)
    const minutes = time / 60
    const hours = time / 3600
    const seconds = time 
    const days = time / (3600 * 24)
    console.log("HOURS....",Math.floor(hours))
    console.log("MINUTES....",Math.floor(minutes))
    console.log("SECONDS....",Math.floor(seconds))
    console.log("DAYS....",Math.floor(days))
    return `${Math.floor(days).toString().padStart(2,"0")}d ${Math.floor(hours).toString().padStart(2,"0")}h ${Math.floor(minutes).toString().padStart(2,"0")}m 
    ${Math.floor(seconds).toString().padStart(2,"0")}s`
}