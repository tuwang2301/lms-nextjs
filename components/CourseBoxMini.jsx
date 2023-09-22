import { Button, Image, Modal, Space, Spin, message } from 'antd';
import React, { useState } from 'react'
import dayjs from 'dayjs';
import { displayDateFormat } from '../constants/constants';
import CourseDetail from './CourseDetail';


const CourseBoxMini = ({ data, enroll_date }) => {
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
                    w-fit
                    mx-3
                    overflow-hidden
                    hover:cursor-pointer
                    bg-slate-50
                    hover:bg-color-button
                    hover:text-gray-100
                    hover:transition-all
                    blur: transition-all'
                    onClick={openDetail}
                >
                    <div className='flex flex-col justify-center px-3 py-4'>
                        <p className='font-bold'>{course.name}</p>
                        <p>{course.subject.name ?? 'Khong co'}</p>
                        <i>{course.teacher?.full_name ?? 'None'}</i>
                    </div>
                </div >
                <Modal open={isOpenDetail} onCancel={() => { setIsOpenDetail(false) }} footer={null} width={800}>
                    <CourseDetail course={course} closeDetail={() => { setIsOpenDetail(false) }} enrolled={!!enroll_date} />
                </Modal>
            </>

        )
    }
}

export default CourseBoxMini