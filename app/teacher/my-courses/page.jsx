'use client'
import React, { useContext, useEffect, useState } from 'react'
import { apiGetCoursesOfTeacher } from '../../../services/TeacherServices';
import { Empty, Spin } from 'antd';
import CourseBox from '../../../components/CourseBox';
import { AuthContext } from '../../../utils/context/AuthProvider'
import { useQuery } from '@tanstack/react-query'

const MyCourses = () => {
    const { auth } = useContext(AuthContext);

    const { data, isLoading } = useQuery({
        queryKey: ['teaching_courses'],
        queryFn: () => apiGetCoursesOfTeacher(auth?.profile?.id),
        enabled: !!auth.profile.id,
        select: (data) => data?.data
    })


    return (
        <div className='w-100%'>
            <h1 className='text-5xl font-extrabold ms-20 '>My Courses</h1>
            <div className='flex justify-center items-center rounded-xl w-11/12 my-20 mt-5 py-10 mx-auto'>
                {
                    isLoading ? <Spin size='large' /> : (
                        <div className='flex flex-wrap justify-start w-full px-auto'>
                            {
                                data?.length > 0 ?
                                    data.map((course, index) => <div className='mx-5 my-10' key={index} ><CourseBox data={course} /></div>)
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