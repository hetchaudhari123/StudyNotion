import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdCloseCircleOutline } from "react-icons/io";
const TagField = ({setValue,register,tagList,setTagList}) => {
    const handleTagChange = (e) => {
        let str = e.target.value;
        str = str.trim();
        if(e.key !== 'Enter' && e.key !== ',' && e.key !== ' '){
            return;
        }
        if(str.length <= 1){
            throw new Error('The Tag Field is empty');
        }
        if(tagList.includes(str)){
            setValue("tag",""); 
            return;
        }
        setTagList([...tagList,str]);
        setValue("tag",""); 
    }
    const removeTag = (cur) => {
        setTagList(tagList.filter((ele) => ele !== cur))
    }

  return (
    <div className='flex flex-col gap-1.5'>
        <div className='gap-0.5 flex flex-row'>
            <div className='text-richblack-5'>Tags</div>
            <span className='text-pink-200'>*</span>
        </div>
{/* width: Fill (617px)px;
height: Hug (48px)px;
padding: 12px 0px 0px 0px;
gap: 16px;
border-radius: 8px 0px 0px 0px;
opacity: 0px;
 */}
        <div className='flex flex-row gap-4 px-4  flex-wrap'>
            {
                tagList.map((ele,index) => {
                    return (
                        <div key={index} className='bg-yellow-400 rounded-[200px] px-4 py-0.5 gap-2 w-fit flex flex-row items-center justify-center'>
                            <div className='text-richblack-5 font-medium'>
                                {ele}
                            </div>
                            <div onClick={() => {removeTag(ele)}} className='cursor-pointer'>
                            <IoMdCloseCircleOutline />
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div 
        style={{ boxShadow: "0px -1px 0px 0px #FFFFFF2E inset" }}
     

        className='bg-richblack-700 p-3 flex gap-4 rounded-lg 
        '>

            <input 
            type="text" 
            name="tag"
            id="tag"
            {...register("tag")
            }
            
            
            onKeyDown={(e) => {
                handleTagChange(e);
            }}
            onKeyUp={(e) => {
                if(e.key === ',' || e.key === ' ' || e.key === 'Enter') 
                setValue("tag","")
            }}
            className='bg-transparent focus:outline-none
            text-richblack-200 font-inter text-base font-medium leading-6 text-left'
            />
            
        </div>
    </div>
  )
}

export default TagField