'use client'
import React, { useContext } from 'react'
import ProfileLayout from '../../../components/ProfileLayout'
import { AuthContext } from '../../../utils/context/AuthProvider'
import { Button, Form, Input } from 'antd';
import { useProfileData } from '../../../utils/hooks/useProfileData';

const ChangeUsername = () => {
    const { auth } = useContext(AuthContext);

    const { data } = useProfileData({ auth });

    const user = data.data

    const changeUsername = (value) => {

    }

    const changeEmail = (value) => {

    }

    return (
        <ProfileLayout>
            <div>
                <h1 className='text-4xl font-semibold text-color-button mb-20' >Change Username or Email</h1>
                <div className='flex justify-around'>
                    <div className='basis-1/2'>
                        <Form
                            layout='vertical'
                            className='w-2/3'
                            onFinish={changeUsername}
                        >
                            <Form.Item
                                label='Old username'
                            >
                                <Input className='w-1/3' disabled placeholder={user?.username} />
                            </Form.Item>
                            <Form.Item
                                name={'newUsername'}
                                label='New Username'
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button size='large'>Change Username</Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className='basis-1/2'>
                        <Form
                            layout='vertical'
                            className='w-2/3'
                            onFinish={changeEmail}
                        >
                            <Form.Item
                                label='Old email'
                            >
                                <Input className='w-1/3' disabled placeholder={user?.email} />
                            </Form.Item>
                            <Form.Item
                                name={'newEmail'}
                                label='New email'
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button size='large'>Change Email</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </ProfileLayout>
    )
}

export default ChangeUsername