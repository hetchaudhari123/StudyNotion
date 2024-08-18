import React, { useState } from 'react'
import CTAButton from "../../core/HomePage/Button"
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import CountryCode from "../../../data/countrycode.json"
import Form from '../../common/Form'
const ContactUsForm = () => {
    
    return (
        <div className='xl:py-24 xl:px-[420px] flex flex-col justify-end gap-8 '>
            <div className='flex flex-col gap-14 '>
                <div className='font-inter text-4xl font-semibold leading-10 tracking-tight text-center text-richblack-5 '>Get in Touch</div>
                <div className='font-inter text-base font-medium leading-6 text-center text-richblack-300 '>We'd love to here for you, Please fill out this form.</div>
            </div>
            <Form></Form>
        </div>
    )
}

export default ContactUsForm