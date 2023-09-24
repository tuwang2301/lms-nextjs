'use client'
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { apiGetEnrolledCourse } from '../../../services/EnrollServices';
import CourseBoxMini from '../../../components/CourseBoxMini';
import { timeframes, weekdays } from '../../../constants/constants';
import dayjs from 'dayjs';
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)


const MyTimetable = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['enrolled_courses'],
        queryFn: apiGetEnrolledCourse,
        select: (data) => data.data.map(enroll => enroll.course)
    })
    // const filter = data?.filter(course => course.timetables.find(time => (time.weekday === 'monday' && time.timeframe === '8:00-10:00')))



    const checkOnGoing = ({ weekday, timeframe }) => {
        const start = dayjs(timeframe.split('-')[0], 'H:mm');
        const end = dayjs(timeframe.split('-')[1], 'H:mm');
        const checkTime = dayjs().isAfter(start) && dayjs().isBefore(end);

        const today = dayjs().format('dddd').toLowerCase();
        const checkDay = today === weekday;
        return checkTime && checkDay;
    }

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
                                    const bg = checkOnGoing({ weekday: day, timeframe: time }) ? 'bg-emerald-200' : ''
                                    return course ?
                                        <td className={`border border-color-button ${bg}`} key={index}>
                                            <CourseBoxMini data={course} enroll_date={true} />
                                        </td>
                                        :
                                        <td key={index} className={`border border-color-button text-center ${bg}`}>Empty</td>
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