'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Input, Modal, Pagination, Space, message } from 'antd';
import CourseBox from '../../components/CourseBox';
import { apiGetCourses } from '../../services/CourseServices';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import MultiSelectTeachers from '../../components/courses/MultiSelectTeachers';
import MultiSelectSubjects from '../../components/courses/MultiSelectSubjects';
import { apiGetMostEnrolledCourse } from '../../services/EnrollServices';
import { displayDateFormat, valueDateFormat } from '../../constants/constants';
import { useMostEnrolledData } from '../../utils/hooks/useMostEnrolledData'
import { AuthContext } from '../../utils/context/AuthProvider';
import { useRouter } from 'next/navigation';

const { RangePicker } = DatePicker;

const { Search } = Input;

const Courses = () => {

    const [courses, setCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [teacherIds, setTeacherIds] = useState([]);
    const [subjectIds, setSubjectIds] = useState([]);
    const { data, isLoading } = useMostEnrolledData();
    const { auth } = useContext(AuthContext);
    const router = useRouter()

    if (!auth) {
        message.error('You have to login first')
        router.push('/')
    }


    useEffect(() => {
        try {
            apiGetCourses('ASC', page, 4, search, startDate, endDate, teacherIds, subjectIds)
                .then((coursesResponse) => {
                    console.log(coursesResponse);
                    const meta = coursesResponse.data.meta;
                    console.log(meta);
                    setTotal(meta.itemCount);
                    setCourses(coursesResponse.data.data);
                })
                .catch((error) => {
                    message.error(error);
                    return;
                })
        } catch (e) {
            message.error(e + '');
        }

        return () => {
            console.log('Unmount Courses');
        }
    }, [page, search, startDate, endDate, teacherIds, subjectIds]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleChangeSearch = (e) => {
        // console.log(e.target.value);
        setSearch(e.target.value);
        console.log(search);
    }

    const handleOnchangeDate = (dates, [start, end]) => {
        if (dates) {
            setStartDate(start);
            setEndDate(end)
        } else {
            setStartDate('2020-01-01');
            setEndDate('2030-01-01')
        }
    }

    const onChangeTeachers = (value) => {
        const teacherIds = value.map(v => v.value)
        setTeacherIds(teacherIds);
        console.log(teacherIds);
    }

    const onChangeSubjects = (value) => {
        const subjectIds = value.map(v => v.value)
        setSubjectIds(subjectIds);
        console.log(subjectIds);
    }

    const handlePageChange = (currentPage) => {
        setPage(currentPage);
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='h-full w-5/6 bg-color-bg shadow-2xl rounded-2xl flex overflow-hidden'>
                <div className='basis-1/3 w-96 bg-color-button'>
                    <h3 className='pt-10 px-10 font-bold text-4xl text-white mb-8'>Courses</h3>
                    <Space
                        direction='vertical'
                        size={'large'}
                        className='px-10 w-full'
                    >
                        <Search
                            onChange={handleChangeSearch}
                            placeholder="Search what you wanna learn"
                            allowClear
                        />
                        <RangePicker
                            className='w-full'
                            onChange={handleOnchangeDate}
                            defaultValue={[dayjs('01/01/2020', displayDateFormat), dayjs('01/01/2030', displayDateFormat)]}
                            format={valueDateFormat}
                        />
                        <MultiSelectTeachers
                            className={'w-full'}
                            value={teacherIds}
                            onChange={onChangeTeachers}
                        />
                        <MultiSelectSubjects
                            className={'w-full'}
                            mode={'multiple'}
                            value={subjectIds}
                            onChange={onChangeSubjects}
                        />
                    </Space>
                    <div className='w-full'>
                        <h3 className='px-10 py-5 font-bold text-4xl text-white'>Hot Course</h3>
                        <div className='flex justify-center'>
                            {data && <CourseBox data={data[0]} />}
                        </div>
                    </div>
                </div>
                <div className='basis-3/4 flex flex-col items-center mt-10 py-3'>
                    <div className='h-full w-full flex justify-center items-start'>
                        <div className='h-full mx-2 flex flex-wrap justify-center items-start' style={{ width: '89%' }}>
                            {courses.map((course, index) => <div className='mx-10' key={index}><CourseBox data={course} key={index} /></div>)}
                        </div>
                    </div>
                    <div>
                        <Pagination
                            defaultCurrent={1}
                            defaultPageSize={4}
                            total={total}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Courses