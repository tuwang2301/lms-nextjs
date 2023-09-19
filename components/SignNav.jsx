'use client'
import Link from 'next/link'
import { Button, Form, Input, Modal, Spin, message } from 'antd';
import { useState, useContext, useEffect } from 'react'
import { apiLogin } from '../services/AuthServices'
import { signIn, signOut, useSession } from 'next-auth/react'
import { AuthContext } from '../utils/context/AuthProvider';
import { useRouter } from 'next/navigation'

const SignNav = () => {
    const [isOpenLogin, setIsOpenLogin] = useState(false)
    const [isOpenRegister, setIsOpenRegister] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const { auth, setAuth } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setAuth(null);
        }
    }, [])

    const onFinish = async (value) => {
        setIsLoading(true);
        const response = await apiLogin(value.username, value.password);
        setIsLoading(false);
        console.log(response);
        if (response.success) {
            message.success('Log in successfully');
            localStorage.setItem('token', response.data.access_token);
            const userId = response.data.user.id;
            const roles = response.data.user.roles.map(role => role.authority);
            setAuth({ userId, roles });
            setIsOpenLogin(false);
        } else {
            message.error(response.data)
        }
    }

    const openLogin = (e) => {
        e.preventDefault();
        setIsOpenLogin(true)
    }

    const logout = () => {
        localStorage.clear();
        setAuth(null);
        router.push('/')
        message.success('Logout successfully');
    }

    let sign = (
        <>
            <Link className='mx-5' onClick={openLogin} href={'/login'}>Login</Link>
            <Button className='bg-color-button' type='primary' size='large'>Register</Button>
        </>
    )

    if (auth) {
        sign = (
            <>
                <Link className='mx-5' href={'/profile/my-profile'}>My Profile</Link>
                <Button onClick={logout} className='bg-color-button' type='primary' size='large'>Logout</Button>
            </>
        )
    }

    return (
        <div className='flex items-center'>
            {sign}
            <Modal
                open={isOpenLogin}
                destroyOnClose={true}
                onCancel={() => { setIsOpenLogin(false) }}
                footer={null}
            >
                <div className='flex justify-center py-8'>
                    <h1 className='text-3xl font-semibold'>LOGIN</h1>
                </div>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    layout='vertical'
                    className='mx-10'
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        validateTrigger='onBlur'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item className='flex justify-center'>
                        {isLoading
                            ?
                            <Spin />
                            :
                            <Button
                                type="primary"
                                htmlType="submit"
                                className='bg-color-button my-5'
                                size='large'
                            >
                                Log in
                            </Button>
                        }

                    </Form.Item>
                </Form>

                <div className='flex justify-between mx-10'>
                    <Link href='/forgot-password'>Forgot password?</Link>
                    <Link href='/register'>Create new account?</Link>
                </div>
            </Modal>
        </div>
    )
}

export default SignNav