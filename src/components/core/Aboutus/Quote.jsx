import React from 'react'

const Quote = () => {
  return (


    <div className='text-4xl font-semibold text-richblack-100 leading-[52px] tracking-tight text-center'>
      We are passionate about revolutionizing the way we learn. Our innovative platform
      <span>{" "}</span>
      <span style={{
        background: 'linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)',
        WebkitBackgroundClip: 'text',
        color: 'transparent'
      }}>
        combines technology
      </span>,
      <span>{" "}</span>
      <span style={{
        background: 'linear-gradient(117.83deg, #FF512F -4.8%, #F09819 107.46%)',
        WebkitBackgroundClip: 'text',
        color: 'transparent'
      }}>
        expertise
      </span>, and community to create an
      <span>{" "}</span>
      <span style={{
        background: 'linear-gradient(117.83deg, #FF512F -4.8%, #F09819 107.46%)',
        WebkitBackgroundClip: 'text',
        color: 'transparent'
      }}> unparalleled educational experience.</span>
    </div>
  )
}

export default Quote