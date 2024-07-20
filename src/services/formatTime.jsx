exports.formatTime = (seconds) => {
  console.log("SECONDS...",seconds)
    seconds = Math.ceil(seconds)

    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    // Prepare parts of the string based on non-zero values
    const parts = [];
    if (hours > 0) {
      parts.push(`${hours}h`);
    }
    if (minutes > 0) {
      parts.push(`${minutes}m`);
    }
    if (seconds > 0 || parts.length === 0) {
      parts.push(`${seconds}s`);
    }
    // Join parts into the final formatted string
    console.log("PARTS JOIN...",parts.join(' '))
    return parts.join(' ');
    
}