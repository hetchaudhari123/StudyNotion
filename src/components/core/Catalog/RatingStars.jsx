import React, { useState } from 'react'
import {
    TiStarFullOutline,
    TiStarHalfOutline,
    TiStarOutline,
  } from "react-icons/ti"
import { useEffect } from 'react'
const RatingStars = ({reviewCount}) => {
    const [fullStarCount,setFullStarCount] = useState(0)
    const [halfStarCount,setHalfStarCount] = useState(0)
    const [emptyStarCount,setEmptyStarCount] = useState(0)
    useEffect(() => {
        console.log("REVIEWCOUNT.....",reviewCount)
        const fullStars = Math.floor(reviewCount) || 0
        const remainder = reviewCount - fullStars
        setFullStarCount(fullStars)
        setHalfStarCount(remainder >= 0.5 ? 1 : 0)
        setEmptyStarCount(5 - fullStars - (remainder >= 0.5 ? 1 : 0))
    },[reviewCount])
  return (
    <div className='text-richblack-5 flex gap-0.5'>
          {/* <TiStarOutline /> */}
        {(new Array(fullStarCount)).fill().map((_,i) => (
            <TiStarFullOutline key={i}/>
        ))}
        {(new Array(halfStarCount)).fill().map((_,i) => (
            <TiStarHalfOutline key={i}/>
        ))}
 
        {(new Array(emptyStarCount)).fill().map((_,i) => (
            <TiStarOutline key={i}/>
        ))}
       
    </div>
  )
}

export default RatingStars