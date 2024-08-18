import React, { useSyncExternalStore } from 'react'
import { FaAngleLeft } from "react-icons/fa6";
import RenderSteps from './RenderSteps';
import CourseForm from './CourseForm';
import CourseTips from './CourseTips';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../../../../redux/slices/courseSlice';
import { setCourseDetails } from '../../../../../redux/slices/courseSlice';
import { useState, useEffect } from 'react';
import Spinner from '../../../../common/Spinner';
import Section from '../CourseBuilder/Section';
import { fetchCourse } from '../../../../../services/operations/courseAPI';
import PublishCourse from '../PublishCourse';
import { useNavigate } from 'react-router-dom';
const AddCourses = () => {
    const navigate = useNavigate()
    const { courseStep,courseDetails } = useSelector(state => state.course); 
    const dispatch = useDispatch(); 
    // FOR TESTING STEP2 -------> REMOVE DURING PRODUCTION
    const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     dispatch(fetchCourse('669297ea069e5e52c23d6324', setLoading, false));
    //     dispatch(setStep(3));
    // }, []);
    useEffect(() => {
        localStorage.setItem("step",JSON.stringify(courseStep))
      },[courseStep])
      useEffect(() => {
        localStorage.setItem("courseDetails",JSON.stringify(courseDetails))
      },[courseDetails])
    return (

        (<div className=''>
            <div className='py-6 pr-32 pl-6 flex flex-row gap-6
                text-richblack-300 font-inter text-sm font-normal leading-6
                text-left'>
                {/* Header */}
                <div className='flex flex-row gap-2 items-center
                 cursor-pointer hover:text-yellow-50
                transition-all duration-200 '
                onClick={() => navigate('/dashboard/instructor')}>
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
                        {
                            courseStep === 3 && <PublishCourse/>
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

export default AddCourses