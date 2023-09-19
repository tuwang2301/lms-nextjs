'use client'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { apiGetMostEnrolledCourse } from '../services/EnrollServices'
import CourseBox from '../components/CourseBox'
import useSWR from 'swr';
import axios from '../services/customizeAxios'
import { Spin } from 'antd';
import { useMost, useMostEnrolledData } from '../utils/hooks/useMostEnrolledData'

const TrendingCourses = () => {

    const { data, isLoading } = useMostEnrolledData();

    return (
        <div id='trending_course' className='flex-col justify-center items-center'>
            <h3 className='font-bold text-4xl my-20 text-center'>Most Trending Course</h3>
            <div className='mb-20 flex flex-row justify-center items-center'>
                {
                    isLoading ? <Spin size='large' /> : data && data?.map((course, index) => {
                        return <div className='mx-10' key={index}> <CourseBox data={course} /></div>
                    })
                }

            </div>
        </div>
    )
}

export default TrendingCourses