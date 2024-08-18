exports.formatString = (inputString,length = 150) => {
    if (inputString.length > length) {
        return inputString.substring(0, length) + ".....";
    } else {
        return inputString;
    }
}