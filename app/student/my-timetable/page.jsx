'use client'
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { apiGetEnrolledCourse } from '../../../services/EnrollServices';
import CourseBoxMini from '../../../components/CourseBoxMini';
import { timeframes, weekdays } from '../../../constants/constants';

const MyTimetable = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['enrolled_courses'],
        queryFn: apiGetEnrolledCourse,
        select: (data) => data.data.map(enroll => enroll.course)
    })
    // const filter = data?.filter(course => course.timetables.find(time => (time.weekday === 'monday' && time.timeframe === '8:00-10:00')))

    const getCourse = ({ weekday, timeframe }) => {
        return data?.find(course => course.timetables.find(time => (time.weekday === weekday && time.timeframe === timeframe)))
    }

    return (
        <div>
            <h1 className='text-5xl font-extrabold ms-20 '>My Timetable</h1>
            <table className='border-collapse border border-slate-500 m-auto mt-10 bg-slate-200'>
                <thead>
                    <tr>
                        <th className='border border-color-button'></th>
                        {weekdays.map((day, index) => <th className='border border-color-button py-5 px-10' key={index}>{day.toUpperCase()}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        timeframes.map((time, index) => (
                            <tr key={index}>
                                <td className='border border-color-button px-5 py-14 font-bold'>{time}</td>
                                {weekdays.map((day, index) => {
                                    const course = getCourse({ weekday: day, timeframe: time });
                                    return course ?
                                        <td className='border border-color-button' key={index}>
                                            <CourseBoxMini data={course} enroll_date={true} />
                                        </td>
                                        :
                                        <td className='border border-color-button text-center'>Empty</td>
                                })
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MyTimetable