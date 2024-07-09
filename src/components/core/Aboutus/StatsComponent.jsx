import React, { useEffect, useState } from 'react'
import { findStats } from '../../../services/operations/authAPI';
import { useDispatch } from 'react-redux';
const StatsComponent = () => {
    const dispatch = useDispatch();
    const [stats,setStats] = useState([
        {count:'5K',label:'Active Students'},
        {count:'10+',label:'Mentors'},
        {count:'200+',label:'Courses'},
        {count:'50+',label:'Awards'},
    ]);
    useEffect(() => {
        dispatch(findStats(setStats));
    },[])
  return (
    
    <div style={{ borderBottom: '1px solid #2C333F' }} className=' flex-col  text-richblack-800 bg-richblack-700 py-24 px-32 flex lg:flex-row gap-2.5 justify-between items-center '>
      
      {/* border-bottom: 1px solid #2C333F */}
        {
            stats.map((data,index) => (
               
                <div key={index} className=' flex flex-col gap-3 w-[292.5px] h-[74px]  '>
                {/* <div key={index} className='  '> */}
                 
                    <div className='flex flex-col justify-between font-inter text-3xl font-bold leading-10 text-center text-richblack-5'>
                      
                        {data.count}
                    </div>
                 
                    <div className='font-inter text-base font-semibold leading-6 text-center text-richblack-500'>
                    {data.label}
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default StatsComponent