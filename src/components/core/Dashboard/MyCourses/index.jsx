import React from 'react'
import { FaAngleLeft } from "react-icons/fa6";
import RenderSteps from './RenderSteps';
import CourseForm from './CourseForm';
import CourseTips from './CourseTips';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../../../redux/slices/courseSlice';
import { setCourseDetails } from '../../../../redux/slices/courseSlice';
import { useState, useEffect } from 'react';
import Spinner from '../../../common/Spinner';
import Section from './Section';
import { fetchCourse } from '../../../../services/operations/courseAPI';
const MyCourses = () => {
    const { courseStep } = useSelector(state => state.course); //FOR TESTING
    const dispatch = useDispatch(); // FOR TESTING 
    // FOR TESTING STEP2 -------> REMOVE DURING PRODUCTION
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(fetchCourse('66950dbf2a500c89cc92860d', setLoading, false));
        dispatch(setStep(2));
    }, []);
    return (

        (<div className=''>
            <div className='py-6 pr-32 pl-6 flex flex-row gap-6
                text-richblack-300 font-inter text-sm font-normal leading-6
                text-left'>
                {/* Header */}
                <div className='flex flex-row gap-2 items-center'>
                    <div>
                        <FaAngleLeft />
                    </div>
                    <div>
                        Back to Dashboard
                    </div>
                </div>
            </div>
            <div className=' flex flex-col gap-6 mx-auto xl:flex-row  w-fit '>

                <div className='flex flex-col gap-4'>

                    <div className=''>
                        {/* Steps */}

                        <RenderSteps ></RenderSteps>


                    </div>
                    <div className=''>
                        {/* Form */}
                        {
                            courseStep === 1 && <CourseForm
                            ></CourseForm>
                        }

                        {
                            courseStep === 2 && <Section />
                        }

                    </div>
                </div>
                <div>
                    {/* CourseTips */}

                    <CourseTips></CourseTips>
                </div>
            </div>
        </div>
        )
    )
}

export default MyCourses