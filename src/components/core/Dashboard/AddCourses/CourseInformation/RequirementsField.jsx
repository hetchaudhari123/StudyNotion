import React, { useState,useEffect } from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";

const RequirementsField = ({ name='requirement',
  register,
  setValue,
  errors,
  reqList,
  setReqList,
  getValues,
clearErrors }) => {
  // const [throwError,setThrowError] = useState(true);
  const [display,setDisplay] = useState("")
  const addHandler = () => {
    if(display === "") return;
    if (!reqList.includes(display)) {
      setReqList([...reqList, display])
      
      setDisplay("")
    }
    // setValue(name, '');
  }
  // console.log('REQLIST.......', reqList);
  useEffect(() => {
       
    register(name, 
        { required: true, 
            validate: (value) => value.length > 0 })
  }, [register])
  useEffect(() => {
    setValue(name,reqList);
    clearErrors(name);
  },[reqList])

  
  return (
    <div className='flex flex-col gap-1.5'>

      <div className='flex flex-row items-center gap-0.5 font-inter text-sm font-normal leading-6 text-left'>
        <div className='text-richblack-5'>
          Requirements/Instructions
        </div>
        <div className='text-pink-200'>
          *
        </div>
      </div>

      <div style={{ boxShadow: "0px -1px 0px 0px #FFFFFF2E inset" }}
        className='bg-richblack-700 p-3 flex gap-3 rounded-lg'>
        {/* input */}
        <input
          type="text"
          name={name}
          id={name}
          value={display}
          onChange={(e) => setDisplay(e.target.value)}
          placeholder='Enter the requirements of the course'
          className='w-full focus:outline-none text-richblack-200 bg-transparent font-inter text-base font-medium leading-6
        text-left' />
      </div>
      {
        (errors[name]) &&
        (<div className='text-richblack-200'>
          {` Please enter the requirements`}
        </div>)
        // (errors[name]) ? 
        // (<div className='text-richblack-200'>
        //   {`Please enter the requirements`}
        // </div>) : 
        // (<div></div>)

      }

      <div
        onClick={addHandler}
        className='cursor-pointer text-yellow-100 font-inter text-base font-bold leading-6
       text-left'>
        Add
      </div>

      <div className='flex flex-row gap-4 px-4 py-2 flex-wrap'>

        {
          reqList.map((ele, index) => (
            <div key={index} className='bg-yellow-400 rounded-[200px] px-4 py-0.5 gap-2 w-fit flex flex-row items-center justify-center'>
              <div className='text-richblack-5 font-medium'>
                {ele}
              </div>
              <div onClick={() => { setReqList(reqList.filter((cur) => cur !== ele)) }} className='cursor-pointer'>
                <IoMdCloseCircleOutline />
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default RequirementsField