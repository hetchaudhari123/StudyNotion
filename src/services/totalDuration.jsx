export const totalDuration = (course) => {
    let time = 0
    course.courseContent.forEach((section) => {
        section.subSection.forEach((subsection) => {
            time += Number(subsection.timeDuration)
        })
    })
    const minutes = time / 60
    const hours = time / 3600
    const seconds = time 
    const days = time / (3600 * 24)
    return `${Math.floor(days).toString().padStart(2,"0")}d ${Math.floor(hours).toString().padStart(2,"0")}h ${Math.floor(minutes).toString().padStart(2,"0")}m 
    ${Math.floor(seconds).toString().padStart(2,"0")}s`
}