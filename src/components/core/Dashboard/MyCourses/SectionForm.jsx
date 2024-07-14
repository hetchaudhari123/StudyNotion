import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import CTAButton from "../../../core/HomePage/Button"
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { HiMiniPencil } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import Spinner from '../../../common/Spinner';
import { buildSection } from '../../../../services/operations/sectionAPI';
import SubSectionModal from './SubSectionModal';
import { useEffect } from 'react';
import { removeSubSection } from '../../../../services/operations/subSectionAPI';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { removeSection } from '../../../../services/operations/sectionAPI';
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
    const initialValues = {
        'sectionName': ''
    }
    const deleteSectionHandler = ({ sectionId }) => {
        dispatch(removeSection({
            courseId: courseDetails._id, sectionId,
            setSubSectionId,
            setSectionId
        },
            setModal,
            setLoading,
            true
        ));

    }
    const submitHandler = () => {

        dispatch(buildSection(getValues('sectionName'),
            courseDetails,
            setLoading,
            true));
    }





    // useEffect(() => {
    // console.log("COURSE DETAILS.....",courseDetails)
    // },[courseDetails]);
    // MODAL
    //1 -> Add Sub Section
    //2 -> Edit Sub Section
    //3 -> Show confirmation modal for deletion of the sub-section
    //4 -> Show confirmation modal for deletion of the section

    const [sectionId, setSectionId] = useState(null);
    const [subSectionId, setSubSectionId] = useState(null);
    const resetModal = () => {
        setModal(0);
        setSectionId(null);
        setSubSectionId(null);
    }
    const addLectureHandler = (id) => {

        setModal(1);
        setSectionId(id);

    }
    const editLectureHandler = ({ subSectionId, sectionId, str }) => {
        if (str === 'subsection') {
            setModal(2);
            setSubSectionId(subSectionId);
            setSectionId(sectionId);
        }
        else {

        }
    }
    const showDeletionModal = ({ sectionId, subSectionId = null }) => {

        setModal((!subSectionId) ? 3 : 4);
        setSectionId(sectionId);
        setSubSectionId(subSectionId);

    }
    const deleteSubSectionHandler = ({ sectionId, subSectionId }) => {
        dispatch(removeSubSection({
            sectionId, subSectionId,
            setModal,
            setSectionId,
            setSubSectionId,
            courseDetails
        },
            setLoading,
            true
        ));
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(initialValues, {
                keepSubmitSuccessful: false
            })
        }
    }, [isSubmitSuccessful])
    // console.log("COURSEDETAILS FROM SECTION FORM.........", courseDetails);
    // FOR TESTING
    // if (!courseDetails || loading) {
    //     return (
    //         <Spinner />
    //     )
    // }
    // FOR PRODUCTION
    return (
        // <form className=' w-full transition-all duration-1000' onSubmit={handleSubmit(submitHandler)}>
        (loading || !courseDetails) ?

            (<Spinner />) :

            (<form className=' w-full transition-all duration-1000' >
                <div className='w-full gap-7 flex flex-col '>

                    <div className=' rounded-lg border bg-richblack-700
                    border-richblack-600'>
                        {
                            // render sections
                            courseDetails?.courseContent?.length > 0 &&
                            courseDetails.courseContent.map((ele, index) => (

                                // border-bottom: 1px solid #424854
                                <div key={index} className='flex flex-col'>

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
                                            <div >
                                                <HiMiniPencil className='cursor-pointer' />
                                            </div>
                                            <div onClick={showDeletionModal({ sectionId: ele._id })}>
                                                <FaRegTrashAlt className='cursor-pointer' />
                                            </div>
                                            {/* border: 1px solid #424854 */}
                                            <div className='border border-richblack-600 h-[20px]'>

                                            </div>
                                            <div>
                                                <FaCaretDown className='cursor-pointer' />
                                                {/* <FaCaretUp className='cursor-pointer' /> */}
                                            </div>
                                        </div>

                                    </div>
                                    <div>
                                        {/*Subsection*/}
                                        {

                                            ele?.subSection?.length > 0 &&
                                            ele.subSection.map((e, i) => (
                                                /*
                                                width: Fill (569px)px;
                                                    height: Hug (46px)px;
                                                    padding: 12px 0px 12px 24px;
                                                    gap: 12px;
                                                    border: 0px 0px 1px 0px;
                                                    opacity: 0px;
    
                                                */
                                                // border-bottom: 1px solid #424854
                                                <div key={e._id}
                                                    className=' flex flex-row 
                                                justify-between items-center 
                                                border-b border-b-richblack-600 
                                                    bg-richblack-700 py-3 px-6 
                                                    gap-3 text-richblack-400
                                                    mx-auto
                                                    w-11/12'>
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
                                                            editLectureHandler({ subSectionId: e._id, sectionId: ele._id, str: 'subsection' })
                                                        }} className='cursor-pointer'>
                                                            <HiMiniPencil className='cursor-pointer' />

                                                        </div>
                                                        <div className='cursor-pointer'
                                                            onClick={() => showDeletionModal({
                                                                sectionId: ele._id,
                                                                subSectionId: e._id
                                                            })
                                                            }>
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
                                                                deleteSubSectionHandler({
                                                                    sectionId: ele._id,
                                                                    subSectionId: e._id
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
                                            addLectureHandler(ele._id);
                                        }}>
                                        <div className='gap-1 flex flex-row
                                    text-yellow-50 font-inter text-base 
                                    font-medium text-left leading-6'>
                                            <div className='font-semibold'>+</div>
                                            <div>Add Lecture</div>
                                        </div>
                                    </div>
                                    {(modal === 1 && sectionId === ele._id) && <SubSectionModal

                                        sectionId={ele._id}
                                        setSectionId={setSectionId}
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
                                    {(modal === 2 && sectionId === ele._id) && <SubSectionModal
                                        edit={true}
                                        sectionId={ele._id}
                                        setSectionId={setSectionId}
                                        subSectionId={subSectionId}
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
                                    {
                                        (modal === 3 && sectionId === ele._id) &&
                                        (<ConfirmationModal
                                            text1={`Delete Section ${ele.title}?`}
                                            text2={`Are you sure you want to delete the
                                        section ${ele.title}.
                                        All Data regarding it will be 
                                        lost permanently.`}
                                            btn1={"Delete"}
                                            btn2={"Cancel"}
                                            onClickBtn2={resetModal}
                                            onClickBtn1={() => deleteSectionHandler({ sectionId: ele._id })}
                                            customClassForBtn2="bg-richblack-700"
                                        />
                                        )
                                    }
                                </div>

                            ))
                        }
                    </div>
                    {/* ))
                    } */}
                </div>
                <div style={{ boxShadow: '0px -1px 0px 0px rgba(255, 255, 255, 0.18 inset' }} className='w-full flex flex-row gap-1.5 bg-richblack-700 rounded-lg'>

                    <input
                        type="text"
                        className='p-3 w-full flex flex-col gap-3 rounded-lg bg-transparent focus:outline-none
                        text-richblack-200 font-inter text-base font-medium leading-6
                        text-left'
                        name='sectionName'
                        id='sectionName'
                        {...register("sectionName", { required: { value: true, message: "Please enter the name of the section." } })}
                        placeholder='Add a section to build your course'
                    />
                </div>
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
                                Create Section
                            </div>
                        </div>
                    </div>


                </div>
                {/* </div> */}
                {/* {text1,text2,setModal,onClickBtn1,onClickBtn2,btn1,btn2} */}

            </form>
            )
    )
}

export default SectionForm