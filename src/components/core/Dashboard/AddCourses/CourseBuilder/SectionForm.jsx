import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import CTAButton from "../../../HomePage/Button"
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { HiMiniPencil } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import Spinner from '../../../../common/Spinner';
import { buildSection } from '../../../../../services/operations/sectionAPI';
import SubSectionModal from './SubSectionModal';
import { useEffect } from 'react';
import { removeSubSection } from '../../../../../services/operations/subSectionAPI';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { removeSection } from '../../../../../services/operations/sectionAPI';
import { editSection } from '../../../../../services/operations/sectionAPI';
import { fetchCourse } from '../../../../../services/operations/courseAPI';
// import { editCourse } from '../../../../../server/controllers/Course';
const SectionForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset,
        getValues,
        setValue
    } = useForm({
        
    });
    const { courseDetails } = useSelector(state => state.course);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(0);
    const [expandSection, setExpandSection] = useState([]);
    const initialValues = {
        'sectionName': ''
    }
    const resetModal = () => {
        setModal(0);
        setSectionId(null);
        setSubSectionId(null);
    }
    const deleteSection = async ({ sectionId }) => {
        const result = await (removeSection({
            courseId: courseDetails._id, 
            sectionId,
            dispatch,
            setSubSectionId,
            setSectionId
        },
            setModal,
            setLoading,
            true
        ))
        if(result){
            resetModal()
        }
    }




   
    // MODAL
    //1 -> Add Sub Section
    //2 -> Edit Sub Section
    //3 -> Show confirmation modal for deletion of the sub-section
    //4 -> Show confirmation modal for deletion of the section
    //5 -> Edit Section

    const [sectionId, setSectionId] = useState(null);
    const [subSectionId, setSubSectionId] = useState(null);

    const addLecture = ({ sectionId }) => {

        setModal(1);
        setSectionId(sectionId);
        setExpandSection([...expandSection,sectionId])

    }


    const editLecture = ({ subSectionId, sectionId, str }) => {
        if (str === 'subsection') {
            setModal(2);
            setSubSectionId(subSectionId);
            setSectionId(sectionId);
        }
        else {
            setModal(5);
            setSectionId(sectionId);
        }
    }
    const showDeletionModal = ({ sectionId, subSectionId = null }) => {
        // console.log('SUBSECTIONID.....',subSectionId);
        setModal((subSectionId) ? 3 : 4);
        setSectionId(sectionId);
        setSubSectionId(subSectionId);

    }
    const deleteSubSection = async ({ sectionId, subSectionId }) => {
        const result = await (removeSubSection({
            sectionId, subSectionId,
            setModal,
            dispatch,
            setSectionId,
            setSubSectionId,
            courseDetails
        },
            setLoading,
            true
        ))
        if(result){
            resetModal()
        }
    }
    const hideDropDown = (id) => {
        setExpandSection(expandSection.filter((ele) => ele !== id));
    }
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(initialValues, {
                keepSubmitSuccessful: false
            })
        }
    }, [isSubmitSuccessful])

    const submitHandler = async  () => {
        // console.log("EDITED SECTION");

        if (modal !== 5) {
            const result = await (buildSection({
                sectionName:getValues('sectionName'),
                courseDetails,
                dispatch},
                setLoading,
                true,
                
            ))
            
        }
        else {
            
            const result = await (editSection(
                {
                    sectionId, 
                    courseDetails,
                    dispatch,
                    sectionName: getValues('sectionName'),
                    setModal
                },
                setLoading,
                true));
        }
        // localStorage.setItem("courseDetails",JSON.stringify(courseDetails))
    }

// useEffect(() => {
//     // console.log("Changed courseDetails....",courseDetails)
//     localStorage.setItem("courseDetails",JSON.stringify(courseDetails))
    
// },[courseDetails])
    return (
        (!courseDetails) ?
            (<Spinner />) :
            (<>
                <form onSubmit={handleSubmit(submitHandler)}
                    className='gap-7 flex flex-col w-full transition-all duration-1000' >
                    <div className='w-full gap-7 flex flex-col '>

                        <div className=' rounded-lg border bg-richblack-700
                    border-richblack-600'>
                            {
                                // render sections
                                courseDetails?.courseContent?.length > 0 &&
                                courseDetails.courseContent.map((ele, index) => (

                                    // border-bottom: 1px solid #424854
                                    <div key={index} className='flex flex-col'>
                                        {/* Error start */}
                                        <div className='py-3 gap-3  bg-richblack-700
                                    border-b border-b-richblack-600 flex flex-row justify-between
                                    w-11/12 mx-auto items-center'>
                                            <div className='gap-2 flex flex-row items-center'>
                                                <div className='text-richblack-400'>
                                                    <RxDropdownMenu className='cursor-pointer' />
                                                </div>

                                                <div className='text-richblack-50
                                    font-inter text-base font-bold leading-6 text-left'>
                                                    {
                                                        ele.sectionName
                                                    }
                                                </div>
                                            </div>
                                            <div className='
                                    font-inter text-base text-richblack-400 font-bold leading-6 text-left flex flex-row gap-3'>
                                                <div onClick={() => {
                                                    editLecture({ sectionId: ele._id });
                                                }}>
                                                    <HiMiniPencil className='cursor-pointer' />
                                                </div>
                                                <div onClick={() => showDeletionModal({ sectionId: ele._id })}>
                                                    <FaRegTrashAlt className='cursor-pointer' />
                                                </div>
                                                {/* border: 1px solid #424854 */}
                                                <div className='border border-richblack-600 h-[20px]'>

                                                </div>
                                                <div>{
                                                    (!expandSection.includes(ele._id)) ? (
                                                        <div onClick={() => { setExpandSection(prev => [...prev, ele._id]) }}>
                                                            <FaCaretDown className='cursor-pointer' />
                                                        </div>
                                                    ) :
                                                        (
                                                            <div onClick={() => hideDropDown(ele._id)} className=''>
                                                                <FaCaretUp className='cursor-pointer' />
                                                            </div>
                                                        )
                                                }
                                                </div>
                                            </div>

                                        </div>
                                        <div>
                                            {/*Subsection*/}
                                            {

                                                ele?.subSection?.length > 0 &&
                                                ele.subSection.map((e, i) => (

                                                    <div key={e._id}
                                                        className={` flex flex-row 
                                                justify-between items-center 
                                                border-b border-b-richblack-600 
                                                    bg-richblack-700 py-3 px-6 
                                                    gap-3 text-richblack-400
                                                    mx-auto
                                                    w-11/12
                                                    ${expandSection.includes(ele._id) ? (" opacity-100") : ("hidden opacity-0")}
                                                 
                                                    `}>
                                                        {/*  ${expandSection.includes(ele._id) ? ("opacity-100") : ("hidden opacity-0")} */}
                                                        <div className='flex flex-row gap-2 items-center '>
                                                            <div className='cursor-pointer'>
                                                                <RxDropdownMenu />
                                                            </div>

                                                            <div className='font-inter
                                                        text-richblack-50
                                                        text-sm
                                                        font-medium
                                                        leading-6
                                                        text-left'>
                                                                {e.title}
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-row gap-3 items-center
                                                    justify-between '>
                                                            {/* Dustbin */}
                                                            <div onClick={() => {
                                                                editLecture({ subSectionId: e._id, sectionId: ele._id, str: 'subsection' })

                                                            }} className='cursor-pointer'>
                                                                <HiMiniPencil className='cursor-pointer' />

                                                            </div>
                                                            <div className='cursor-pointer'
                                                                onClick={() => {
                                                                    showDeletionModal({

                                                                        sectionId: ele._id,
                                                                        subSectionId: e._id
                                                                    })
                                                                }}>
                                                                <FaRegTrashAlt className='cursor-pointer' />

                                                            </div>
                                                        </div>
                                                        {
                                                            (modal === 3 && subSectionId === e._id && sectionId === ele._id) &&
                                                            <ConfirmationModal
                                                                text1={`Delete Lecture ${e.title}?`}
                                                                text2={`Are you sure you want to delete the
                                                        lecture ${e.title}.All Data regarding it will be 
                                                        lost permanently.`}
                                                                btn1={"Delete"}
                                                                btn2={"Cancel"}
                                                                onClickBtn2={resetModal}
                                                                onClickBtn1={() => {
                                                                    deleteSubSection({
                                                                        sectionId,
                                                                        subSectionId
                                                                    })
                                                                }}
                                                                customClassForBtn2="bg-richblack-700"
                                                            ></ConfirmationModal>
                                                        }
                                                    </div>

                                                ))
                                            }
                                        </div>

                                        <div className=' py-3 gap-3  bg-richblack-700
                                        border-b border-b-richblack-600 flex flex-row justify-between
                                        w-11/12 mx-auto items-center cursor-pointer'
                                            onClick={() => {
                                                addLecture({ sectionId: ele._id });
                                            }}>
                                            <div className='gap-1 flex flex-row
                                            text-yellow-50 font-inter text-base 
                                            font-medium text-left leading-6'>
                                                <div className='font-semibold'>+</div>
                                                <div>Add Lecture</div>
                                            </div>
                                        </div>


                                    </div>

                                ))
                            }
                        </div>
                        {/* ))
                    } */}
                    </div>
                    <div style={{ boxShadow: '0px -1px 0px 0px rgba(255, 255, 255, 0.18 inset' }}
                        className='w-full flex flex-row gap-1.5
                 bg-richblack-700 rounded-lg'>
                        <div className='w-full pr-3 flex flex-row 
                    justify-between items-center'>

                            <input
                                type="text"
                                className='p-3 w-full flex flex-col gap-3 rounded-lg bg-transparent focus:outline-none
                        text-richblack-200 font-inter text-base font-medium leading-6
                        text-left'
                                name='sectionName'
                                id='sectionName'
                                {...register("sectionName",
                                    {
                                        required: {
                                            value: true,
                                            message: "Please enter the course name."
                                        }
                                    })}
                                placeholder='Add a section to build your course'
                            />

                        


                            {
                                modal === 5 &&
                                (<div
                                    onClick={resetModal}
                                    className=' hover:text-blue-300
                     text-richblack-200 
                     underline cursor-pointer'>
                                    Close
                                </div>
                                )
                            }
                        </div>
                        
                              
                        

                    </div>
                    {
                                errors.sectionName && (
                                    <div className='text-richblack-200'>
                                        {errors.sectionName.message}
                                    </div>
                                )
                            }
                    <div>


                        <div onClick={handleSubmit(submitHandler)} style={{

                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                        }}
                            className={`
                                        border border-yellow-50 
                                        cursor-pointer font-medium text-base  
                                        leading-6 text-center
                                        bg-richblack-800 px-3 py-2 lg:px-6 lg:py-3 
                                        rounded-lg transition-all 
                                        duration-200 hover:scale-95 w-fit`}>
                            <div className='flex flex-row gap-2 w-fit items-center'>
                                <div className='text-yellow-50'>
                                    {/* icon */}
                                    <IoIosAddCircleOutline />
                                </div>


                                <div className='text-yellow-50 font-inter
                                text-base font-medium leading-6 text-center'>
                                    {/* text */}
                                    {
                                        (modal !== 5) ? "Create Section" : "Edit Section"
                                    }
                                </div>
                            </div>
                        </div>


                    </div>
                    {/* </div> */}
                    {/* {text1,text2,setModal,onClickBtn1,onClickBtn2,btn1,btn2} */}

                </form>
                {(modal === 1) && <SubSectionModal

                    sectionId={sectionId}
                    setSectionId={setSectionId}
                    setSubSectionId={setSubSectionId}
                    dispatch={dispatch}
                    setModal={setModal} modal={modal}
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    isSubmitSuccessful={isSubmitSuccessful}
                    reset={reset}
                    setValue={setValue}
                    getValues={getValues}
                    
                />}
                {(modal === 2 ) && <SubSectionModal
                    edit={true}
                    sectionId={sectionId}
                    setSectionId={setSectionId}
                    subSectionId={subSectionId}
                    setSubSectionId={setSubSectionId}
                    dispatch={dispatch}
                    setModal={setModal} 
                    modal={modal}
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    isSubmitSuccessful={isSubmitSuccessful}
                    reset={reset}
                    setValue={setValue}
                    getValues={getValues}
                />}
                {
                    
                    (modal === 4) &&
                    (<ConfirmationModal
                        text1={`Delete Section ${courseDetails?.courseContent?.find(ele => ele._id === sectionId)?.sectionName}`}
                        text2={`Are you sure you want to delete the
    section ${courseDetails?.courseContent.find(ele => ele._id === sectionId)?.sectionName}.
    All Data regarding it will be 
    lost permanently.`}
                        btn1={"Delete"}
                        btn2={"Cancel"}
                        onClickBtn2={resetModal}
                        onClickBtn1={() => deleteSection({ sectionId })}
                        customClassForBtn2="bg-richblack-700"
                    />
                    )
                }
            </>
            )
    )
}

export default SectionForm