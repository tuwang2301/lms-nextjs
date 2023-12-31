import { Button, Image, Modal, Space, Spin, message } from 'antd';
import React, { useState } from 'react'
import dayjs from 'dayjs';
import { displayDateFormat } from '../constants/constants';
import CourseDetail from './CourseDetail'


const CourseBox = ({ data, enroll_date }) => {
    const [isOpenDetail, setIsOpenDetail] = useState(false);

    const course = {
        ...data,
        startAt: dayjs(data.start_at).format(displayDateFormat),
        endAt: dayjs(data.end_at).format(displayDateFormat),
    }


    const openDetail = () => {
        setIsOpenDetail(true);
    }

    if (course !== undefined) {
        return (
            <>
                <div
                    className='
                    rounded-lg
                    shadow-xl
                    w-72
                    overflow-hidden
                    hover:cursor-pointer
                    hover:w-80
                    hover:bg-color-button
                    hover:text-gray-100
                    hover:transition-all
                    blur: transition-all'
                    onClick={openDetail}
                >
                    <div>
                        <img className='w-full h-44 object-cover' src={course.image}></img>
                    </div>
                    <div className='flex flex-col justify-center pt-3 ps-3 pb-4'>
                        <a href='#' className='font-bold text-lg'>{course.name}</a>
                        <p>{course.subject.name ?? 'Khong co'} - {course.teacher?.full_name ?? 'None'}</p>
                        <i>{course.startAt} - {course.endAt}</i>
                    </div>
                    {
                        enroll_date &&
                        <div className='flex justify-center border-t-2 py-2'>
                            <b>
                                Enrolled:  {dayjs(enroll_date).format(displayDateFormat)}
                            </b>

                        </div>
                    }

                </div >
                <Modal open={isOpenDetail} onCancel={() => { setIsOpenDetail(false) }} footer={null} width={800}>
                    <CourseDetail course={course} closeDetail={() => { setIsOpenDetail(false) }} enrolled={!!enroll_date} />
                </Modal>
            </>

        )
    }
}

export default CourseBox