"use client"
import React from 'react'
import ProfileLayout from '../../../components/ProfileLayout'
import { Button, Form, Input } from 'antd'

const changePassword = (value) => {
    console.log(value);
}

const ChangePassword = () => {

    return (
        <div>
            <h1 className='text-4xl font-semibold text-color-button mb-20' >Change Password</h1>
            <Form
                layout='vertical'
                className='w-2/3'
                onFinish={changePassword}
            >
                <Form.Item
                    label='Old Password'
                >
                    <Input type='password' className='w-1/3' />
                </Form.Item>
                <Form.Item
                    name={'newUsername'}
                    label='New Password'
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={'confirmNewPassword'}
                    label='Confirm New Password'
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button size='large'>Change Password</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ChangePassword