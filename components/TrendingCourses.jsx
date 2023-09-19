'use client'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { apiGetMostEnrolledCourse } from '../services/EnrollServices'
import CourseBox from '../components/CourseBox'
import useSWR from 'swr';
import axios from '../services/customizeAxios'

const fetcher = url => axios.get(url).then(res => res.data)

const TrendingCourses = () => {
    const { data, error, isLoading } = useSWR('/enrollment/most-enrolled', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });


    return (
        <div id='trending_course' className='flex-col justify-center items-center'>
            <h3 className='font-bold text-4xl my-20 text-center'>Most Trending Course</h3>
            <div className='mb-20 flex flex-row justify-center items-center'>
                {data && data?.map((course, index) => {
                    return <div className='mx-10' key={index}> <CourseBox data={course} /></div>
                })}
            </div>
        </div>
    )
}

export default TrendingCourses