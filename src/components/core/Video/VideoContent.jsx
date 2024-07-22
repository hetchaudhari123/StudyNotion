import React, { useEffect, useState } from 'react'
import LectureVideo from './LectureVideo'
import VideoDescription from './VideoDescription'
const VideoContent = () => {
  return ( 
        <>
        <div className='w-full  flex-1 flex flex-col gap-2'>
        <LectureVideo />
        <VideoDescription/>
        </div>
        </>
  )
}

export default VideoContent