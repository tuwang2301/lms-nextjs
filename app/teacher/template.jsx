'use client'
import React, { useContext } from 'react'
import { AuthContext } from '../../utils/context/AuthProvider'
import { redirect, useRouter } from 'next/navigation';
import { message } from 'antd';

const teacherTemplate = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const router = useRouter();
    if (!auth) {
        router.push('/');
        message.error('You have to login first');
    } else {
        if (!auth.roles?.includes('teacher')) {
            redirect('/error/403')
        }
    }

    return (
        <div>{children}</div>
    )
}

export default teacherTemplate