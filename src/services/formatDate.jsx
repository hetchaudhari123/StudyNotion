export const formatDate = (dateString) => {
    // console.log("INITIAL DATE STRING.....",dateString)

    const options = { year: "numeric", month: "long", day: "numeric" }
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString("en-US", options)
  
    const hour = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    const period = hour >= 12 ? "PM" : "AM"
    const formattedTime = `${hour % 12}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`
    // console.log("HOUR.....",hour)
    // console.log("MINUTES.....",minutes)
    // return `${formattedDate} | ${formattedTime}`;
    return `${formattedDate}`;
  }