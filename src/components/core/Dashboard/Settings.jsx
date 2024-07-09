import React from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'
import CTAButton from "../../core/HomePage/Button"
import FormSettings from './FormSettings'
const Settings = () => {
    const {user} = useSelector(state => state.profile);
  return (
    <div>
        <Header text1={"Settings"} text2 = {"Edit Profile"}></Header>
        <FormSettings></FormSettings>
    </div>
  )
}

export default Settings