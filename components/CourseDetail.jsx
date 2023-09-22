'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button, Space, message } from "antd"
import { apiEnrollCourse, apiUnenrollCourse } from "../services/EnrollServices"

const CourseDetail = ({ course, closeDetail, enrolled }) => {
    const queryClient = useQueryClient()
    const { isLoading: isLoadingUnenroll, mutate: refetchUnenroll } = useMutation({
        mutationKey: ['unenroll'],
        mutationFn: () => apiUnenrollCourse(course.id),
        onSuccess: (value) => {
            console.log(value);
            if (value.success) {
                message.success('Unregister successfully');
                queryClient.invalidateQueries(['enrolled_courses']);
                closeDetail();
            } else {
                message.error(value.data);
            }

        },
        onError: (e) => {
            message.error('Unregister fail')
        }
    })
    const { isLoading: isLoadingEnroll, mutate: refetchEnroll } = useMutation({
        mutationKey: ['enroll'],
        mutationFn: () => apiEnrollCourse(course.id),
        onSuccess: (value) => {
            console.log(value);
            if (value.success) {
                message.success('Register successfully');
                closeDetail();
            } else {
                message.error(value.data);
            }

        },
        onError: (e) => {
            message.error(e.message)
        }
    })

    const handleRegister = () => {
        refetchEnroll()
    }

    const handleUnregister = () => {
        refetchUnenroll()
    }

    let times = []

    if (course.timetables) {
        times = course.timetables.map(t => ({
            weekday: t.weekday,
            timeframe: t.timeframe
        }))
    }


    return (
        <>
            <h1 className='text-4xl font-extrabold mb-5'>{course.name}</h1>
            <div className='flex flex-col items-center'>
                <div className='basis-1/3 rounded-xl overflow-hidden mx-2 my-5'>
                    <img alt="" className='object-fill w-full h-full' src={course.image}></img>
                </div>
                <div className='basis-2/3 mx-2'>
                    <Space direction='vertical'>
                        <h1 className='text-lg'>Subject: <span className='font-semibold'>{course.subject.name}</span></h1>
                        <h1 className='text-lg'>Teacher: <span className='font-semibold'>{course.teacher.full_name ?? 'None'}</span></h1>
                        <h1 className='text-lg'>Time expect: <span className='font-semibold'>{course.startAt} - {course.endAt}</span></h1>
                        <h1 className='text-lg'>Schedule: </h1>
                        {
                            times.length > 0 && times.map(time => (
                                <span className='ms-20 font-semibold text-lg'>{time.weekday.toUpperCase()} - {time.timeframe}</span>
                            ))
                        }
                        <h1 className='text-lg'>Desription: </h1>
                        <i className='text-lg'>{course.description}</i>
                    </Space>
                </div>
            </div>
            <div className='flex justify-center mt-5'>
                {
                    enrolled ?
                        <Button
                            onClick={handleUnregister}
                            size='large'
                            danger
                        >
                            {isLoadingUnenroll ? <Spin /> : 'Unregister'}
                        </Button>
                        :
                        <Button
                            onClick={handleRegister}
                            size='large'
                            type={!isLoadingEnroll && 'primary'}
                            className={!isLoadingEnroll && 'bg-color-button'}
                        >
                            {isLoadingEnroll ? <Spin /> : 'Register'}
                        </Button>
                }
            </div>
        </>
    )
}


export default CourseDetail;