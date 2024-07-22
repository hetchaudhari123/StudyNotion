import React from 'react'

const avgRating = (course) => {
    if (course.ratingAndReviews.length === 0) {
        return {avg:0,
            review_cnt:0}
    }
    const totalRating = course.ratingAndReviews.reduce((prev,cur) => {
        return prev + Number(cur.rating)
    },0) 
    console.log("TOTAL RATING...",totalRating)
    console.log("COURSE RATING AND REVIEW LENGTH...",course.ratingAndReviews.length)
    return {avg:(totalRating / course.ratingAndReviews.length),
        review_cnt:course.ratingAndReviews.length}
}

export default avgRating