'use client'
import React, { useContext } from 'react'
import { AuthContext } from '../../utils/context/AuthProvider'
import { redirect, useRouter } from 'next/navigation';
import { message } from 'antd';

const AdminTemplate = ({ children }) => {
    const { auth } = useContext(AuthContext);
    console.log(auth);
    const router = useRouter();
    if (!auth) {
        router.push('/');
        message.error('You have to login first');
    } else {
        if (!auth.roles?.includes('admin')) {
            redirect('/error/403')
        }
    }

    return (
        <div>{children}</div>
    )
}

export default AdminTemplate