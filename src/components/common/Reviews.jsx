import React from 'react'
import ReviewSlider from './ReviewSlider'
import { useState,useEffect } from 'react'
import { fetchAllReviews } from '../../services/operations/reviewAPI'
const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            const response = await fetchAllReviews(null, false)
            setReviews(response)
            setLoading(false)
        }
        fetch()
    }, [])
  return (
    
        (!loading && reviews && reviews.length > 0) && 
        (
            <div className="p-20 flex flex-col gap-20">
                <div className="flex flex-row justify-center text-richblack-5 font-inter text-4xl font-semibold leading-10 tracking-tight text-left w-full  ">
                    Reviews from other learners
                </div>

                <ReviewSlider
                    loading={loading}
                    setLoading={setLoading}
                    reviews={reviews}
                    setReviews={setReviews}
                >
                </ReviewSlider>
            </div>
        )
  )
}

export default Reviews