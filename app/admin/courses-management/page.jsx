'use client'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { apiDeleteCourse, apiGetCourses } from '../../../services/CourseServices';
import { Button, Modal, Pagination, Space, Table, message, DatePicker } from 'antd';
import { showDeleteConfirm } from '../../../components/deleteConfirm';
import CreateCourseForm from '../../../components/courses/crud/CreateCourseForm';
import UpdateCourseForm from '../../../components/courses/crud/UpdateCourseForm';
import ScheduleCourse from '../../../components/courses/ScheduleCourse';

import Search from 'antd/es/input/Search';
import MultiSelectSubjects from '../../../components/courses/MultiSelectSubjects';
import MultiSelectTeachers from '../../../components/courses/MultiSelectTeachers';
import { displayDateFormat } from '../../../constants/constants';
import { useQuery } from '@tanstack/react-query';

const { RangePicker } = DatePicker;

const CoursesManagement = () => {

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [teacherIds, setTeacherIds] = useState([]);
    const [subjectIds, setSubjectIds] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [isOpenSchedule, setIsOpenSchedule] = useState(false);
    const [updateCourse, setUpdateCourse] = useState();
    const [scheduleCourse, setScheduleCourse] = useState();

    const { data: courseResponse, refetch } = useQuery({
        queryKey: ['courses-management', page, pageSize, search, startDate, endDate, teacherIds, subjectIds],
        queryFn: () => apiGetCourses('DESC', page, pageSize, search, startDate, endDate, teacherIds, subjectIds),
        select: (data) => data.data
    })

    console.log(courseResponse);

    const total = courseResponse?.meta.itemCount;
    const courses = courseResponse?.data;


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 50,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: 100
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            sorter: (a, b) => a.subject.localeCompare(b.subject),
        },
        {
            title: 'Teacher',
            key: 'teacher',
            dataIndex: 'teacher',
            sorter: (a, b) => a.teacher.localeCompare(b.teacher),
        },
        {
            title: 'Start Time',
            key: 'start_at',
            dataIndex: 'start_at',
            sorter: (a, b) => dayjs(a.start_at, 'DD/MM/YYYY').diff(dayjs(b.start_at, 'DD/MM/YYYY')),
        },
        {
            title: 'End Time',
            key: 'end_at',
            dataIndex: 'end_at',
            sorter: (a, b) => dayjs(a.end_at, 'DD/MM/YYYY').diff(dayjs(b.end_at, 'DD/MM/YYYY')),
        },
        {
            title: 'Image',
            key: 'image',
            dataIndex: 'image',
            ellipsis: true,
            render: (_, record) => (
                <img src={record.image}></img>
            )
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
            ellipsis: true,
        },
        {
            title: 'Created at',
            key: 'created',
            dataIndex: 'created',
            sorter: (a, b) => dayjs(a.created, 'DD/MM/YYYY').diff(dayjs(b.created, 'DD/MM/YYYY')),
        },
        {
            title: 'Updated at',
            key: 'updated',
            dataIndex: 'updated',
            sorter: (a, b) => dayjs(a.updated, 'DD/MM/YYYY').diff(dayjs(b.updated, 'DD/MM/YYYY')),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space direction='vertical'>
                    <Button
                        onClick={() => { handleEditCourse({ record }) }}
                        type='default'
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => { schedule(record) }}
                        type='dashed'
                    >
                        Schedule
                    </Button>
                    <Button
                        onClick={() => { deleteConfirmCourse(record) }}
                        danger
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const schedule = (record) => {
        console.log(record.timetables);
        setScheduleCourse(record);
        setIsOpenSchedule(true);
    }

    const handleEditCourse = (record) => {
        setIsOpenUpdate(true)
        setUpdateCourse(record);
    }

    const deleteConfirmCourse = (course) => {
        const content = (
            <div>
                <p><b>Name: {course.name}</b></p>
                <p>Subject: {course.subject}</p>
                <p>Teacher: {course.teacher}</p>
                <p><i>From {course.start_at} to {course.end_at}</i></p>
            </div>
        )
        const handleDelete = async () => {
            // console.log(course);
            const res = await apiDeleteCourse(course.id);
            if (res.success) {
                message.success('Delete successfully');
            } else {
                message.error('Delete fail!');
            }
            refetch();
        }
        showDeleteConfirm('Do you want to delete this course?', content, handleDelete)
    }

    const data = courses?.map(course => (
        {
            ...course,
            key: course.id,
            subject_id: course.subject.id,
            subject: course.subject.name,
            teacher_id: course.teacher?.id ?? '0',
            teacher: course?.teacher?.full_name ?? 'None',
            created: dayjs(course.created).format(displayDateFormat),
            updated: dayjs(course.updated).format(displayDateFormat),
            start_at: dayjs(course.start_at).format(displayDateFormat),
            end_at: dayjs(course.end_at).format(displayDateFormat),
        }
    ))

    const onShowSizeChange = (current, newPageSize) => {
        setPageSize(newPageSize);
    }

    const handlePageChange = (currentPage) => {
        setPage(currentPage);
    }

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

    return (
        <div className='mx-20'>
            <div className='flex justify-between'>
                <h3 className='font-bold text-4xl mb-5'>Courses Management</h3>
                <Button size='large' type='primary' className='bg-color-button' onClick={() => { setIsOpenCreate(true) }}>Add New Course</Button>
            </div>
            <div className='flex items-center justify-between my-3'>
                <Search
                    onChange={handleChangeSearch}
                    placeholder="Search what you wanna learn"
                    allowClear
                    className='basis-1/2'
                />
                <RangePicker
                    onChange={handleOnchangeDate}
                    className='w-1/2 mx-3'
                    defaultValue={[dayjs('01/01/2020', 'DD/MM/YYYY'), dayjs('01/01/2030', 'DD/MM/YYYY')]}
                    format={'YYYY-MM-DD'}
                />
            </div>
            <div className='flex justify-around mb-5'>
                <MultiSelectTeachers
                    className={'w-1/2 mx-3'}
                    value={teacherIds}
                    onChange={onChangeTeachers}
                />
                <MultiSelectSubjects
                    className={'w-1/2 mx-3'}
                    mode={'multiple'}
                    value={subjectIds}
                    onChange={onChangeSubjects}
                />
            </div>
            <div>
                <Table columns={columns} dataSource={data} pagination={false} />
                <div className='flex justify-center my-10 w-full'>
                    <Pagination
                        showSizeChanger
                        defaultCurrent={1}
                        defaultPageSize={5}
                        onShowSizeChange={onShowSizeChange}
                        total={total}
                        pageSizeOptions={[5, 10, 15, 20]}
                        onChange={handlePageChange}
                    />
                </div>
                <Modal style={{ top: 50 }} footer={null} title={'Create New Course'} open={isOpenCreate} onCancel={() => { setIsOpenCreate(false) }}>
                    <div>
                        <CreateCourseForm fetchCourses={refetch} onClose={() => { setIsOpenCreate(false) }} />
                    </div>
                </Modal>
                <Modal destroyOnClose={true} style={{ top: 50 }} footer={null} title={'Update Course'} open={isOpenUpdate} onCancel={() => { setIsOpenUpdate(false) }}>
                    <div>
                        <UpdateCourseForm fetchCourses={refetch} course={updateCourse} onClose={() => { setIsOpenUpdate(false) }} />
                    </div>
                </Modal>
                <Modal destroyOnClose={true} style={{ top: 50 }} footer={null} title={'Schedule Course'} open={isOpenSchedule} onCancel={() => { setIsOpenSchedule(false) }}>
                    <div>
                        <ScheduleCourse course={scheduleCourse} onClose={() => { setIsOpenSchedule(false) }} />
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default CoursesManagement