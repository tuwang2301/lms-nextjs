import React, { useState } from 'react'
import { Button, Empty, Select, Space, Table, message } from 'antd'
import { timeframes, weekdays } from '../../constants/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiSchedule, apiUnschedule } from '../../services/TimetableServices'
const ScheduleCourse = ({ course, onClose }) => {
    const [courseWeekday, setCourseWeekday] = useState(weekdays[0]);
    const [courseTimeframe, setCourseTimeframe] = useState(timeframes[0]);
    const [courseSchedule, setCourseSchedule] = useState(course)
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: () => apiSchedule({ course_id: course.id, weekday: courseWeekday, timeframe: courseTimeframe }),
        onSuccess: (value) => {
            if (value.success) {
                message.success('Add schedule success');
                queryClient.invalidateQueries('courses-management');
                setCourseSchedule(value.data)
            } else {
                message.error(value.data)
            }

        },
        onError: (error) => { message.error(error) }
    })

    const { mutate: unschedule } = useMutation({
        mutationFn: ({ course_id, timetable_id }) => apiUnschedule({ course_id, timetable_id }),
        onSuccess: (value) => {
            if (value.success) {
                message.success('Add schedule success');
                queryClient.invalidateQueries('courses-management');
                setCourseSchedule(value.data)
            } else {
                message.error(value.data)
            }

        },
        onError: (error) => { message.error(error) }
    })

    const columns = [
        {
            title: 'Weekday',
            dataIndex: 'weekday',
            key: 'weekday',
            render: (_, record) => (
                <b>{record.weekday}</b>
            )
        },
        {
            title: 'Timeframe',
            dataIndex: 'timeframe',
            key: 'timeframe',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <a onClick={() => deleteSchedule(record.id)} className='text-red-400 hover:text-red-300'>Delete</a>
            ),
        },
    ];

    const data = courseSchedule?.timetables.map((time, index) => {
        return {
            key: index,
            ...time
        }
    })

    const weekdaysOptions = weekdays.map(w => {
        return {
            value: w,
            label: w
        }
    })
    const timeframesOptions = timeframes.map(t => {
        return {
            value: t,
            label: t
        }
    })

    const changeDay = (value) => {
        console.log(value);
        setCourseWeekday(value)
    }

    const changeTime = (value) => {
        console.log(value);
        setCourseTimeframe(value)
    }

    const addSchedule = () => {
        const newSchedule = {
            course_id: course.id,
            weekday: courseWeekday,
            timeframe: courseTimeframe
        }
        mutate();
    }

    const deleteSchedule = (id) => {
        console.log(course.id);
        console.log(id);
        unschedule({ course_id: course.id, timetable_id: id })
    }

    return (
        <div>
            <h1 className='m-5 text-lg font-bold'>Schedule time: </h1>
            {courseSchedule?.timetables?.length > 0
                ?
                <Table columns={columns} dataSource={data} pagination={false} />
                :
                <Empty />
            }
            <Space className='flex justify-center mt-5'>
                <Select onChange={changeDay} defaultValue={weekdaysOptions[0]} options={weekdaysOptions} />
                <Select onChange={changeTime} defaultValue={timeframesOptions[0]} title='timeframe' options={timeframesOptions} />
                <Button type='primary' className='bg-color-button' onClick={addSchedule}>Add new schedule</Button>
            </Space>
        </div>
    )
}

export default ScheduleCourse