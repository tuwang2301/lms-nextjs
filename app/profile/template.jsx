'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Space, Spin, message } from 'antd';
import { AuthContext } from '../../utils/context/AuthProvider';
import { Navigation } from '../../components/Navigation'
import { useRouter } from 'next/navigation';

const ProfileTemplate = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const [user, sUser] = useState();
    const [profile, setProfile] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    if (!auth) {
        router.push('/');
        message.error('You have to login first')
    }

    const navlinks = [
        {
            href: '/profile/my-profile',
            name: 'My Profile'
        },
        {
            href: '/profile/change-username',
            name: 'Change Username/Email'
        },
        {
            href: '/profile/change-password',
            name: 'Change Password'
        },
        {
            href: '/profile/feedback',
            name: 'Feedback'
        }
    ]


    return (
        <div className='flex justify-center mx-auto h-screen w-10/12'>
            <Space direction='vertical' size={'large'} className='basis-1/4 shadow-xl rounded-2xl mx-2 p-10 h-5/6 flex flex-col items-start'>
                <Navigation className={'flex flex-col text-lg h-96 justify-between'} navLinks={navlinks} />
            </Space>
            <div className='basis-3/4 shadow-xl rounded-2xl mx-2 h-5/6 p-10'>
                {
                    isLoading ? <Spin size='large' /> : children
                }
            </div>
        </div>
    )
}

export default ProfileTemplate