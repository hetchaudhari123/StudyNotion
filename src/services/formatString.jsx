exports.formatString = (inputString,length = 150) => {
    if (inputString.length > 150) {
        return inputString.substring(0, 150) + ".....";
    } else {
        return inputString;
    }
}