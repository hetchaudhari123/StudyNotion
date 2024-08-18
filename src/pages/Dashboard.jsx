import React from 'react'
import Sidebar from '../components/core/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Header from '../components/core/Dashboard/Header'
import { useSelector } from 'react-redux'
const Dashboard = () => {
  return (
    <div className='flex flex-row '>
    <div className='flex flex-row min-h-[calc(100vh-5rem)]'>
            <Sidebar></Sidebar>
        </div>
        <div className='flex-1'>
              <Outlet/>
        </div>
    </div>
   
  )
}

export default Dashboard