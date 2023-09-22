'use client'
import React, { useContext, useEffect, useState } from 'react'
import { apiGetEnrolledCourse } from '../../../services/EnrollServices';
import { Empty, Spin } from 'antd';
import CourseBox from '../../../components/CourseBox';
import { AuthContext } from '../../../utils/context/AuthProvider'
import { useQuery } from '@tanstack/react-query'

const MyCourses = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['enrolled_courses'],
        queryFn: apiGetEnrolledCourse,
    })

    return (
        <div className='w-100%'>
            <h1 className='text-5xl font-extrabold ms-20 '>My Courses</h1>
            <div className='flex justify-center items-center rounded-xl w-11/12 my-20 mt-5 py-10 mx-auto'>
                {
                    isLoading ? <Spin size='large' /> : (
                        <div className='flex flex-wrap justify-start w-full px-auto'>
                            {
                                data?.data.length > 0 ?
                                    data.data.map((course, index) => <div className='mx-5 my-10' key={index} ><CourseBox data={course.course} enroll_date={course.enroll_date} /></div>)
                                    :
                                    <Empty />
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MyCourses