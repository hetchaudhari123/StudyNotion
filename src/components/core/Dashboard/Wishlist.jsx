import React from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'
const Wishlist = () => {
    const {total,totalItems,cart} = useSelector(state => state.cart);
    console.log(total);
    console.log(totalItems);
    console.log(cart);
  return (
    <div>
        <Header text1={'Wishlist'} text2={'Wishlist'}></Header>
        <div>
      
            <div className='font-inter text-base font-semibold leading-6 text-left pr-32 pl-6 gap-3 flex text-richblack-400'>
            3 Courses in Wishlist
            </div>
            <div>

            </div>
        </div>
    </div>
  )
}

export default Wishlist