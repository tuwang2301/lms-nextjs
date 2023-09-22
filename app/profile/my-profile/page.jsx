'use client'
import React, { useContext, useState } from 'react'
import ProfileLayout from '../../../components/ProfileLayout'
import { Button, DatePicker, Form, Image, Input, Modal, Select, Space, Spin, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { AuthContext } from '../../../utils/context/AuthProvider'
import dayjs from 'dayjs'
import { useUpdateStudent } from '../../../utils/hooks/useUpdateStudent'
import { v4 } from 'uuid'
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { useProfileData } from '../../../utils/hooks/useProfileData'

const MyProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenChangeAva, setIsOpenChangeAva] = useState(false);
    const [isOpenChangeProfile, setIsOpenChangeProfile] = useState(false);
    const [uploadFile, setUploadFile] = useState();
    const { auth } = useContext(AuthContext)

    const { data, isLoading: profileLoading, error, refetch } = useProfileData({ auth })
    const profile = data?.data.student ?? data?.data.teacher;

    let onSuccess = () => {
        message.success('Edit successfully');
        refetch();
        setIsOpenChangeProfile(false);
    }

    const { data: editResponse, mutate, isLoading: loadingChange, error: editError, isSuccess } = useUpdateStudent({ onSuccess });

    const user = data?.data;
    const url = uploadFile ? URL.createObjectURL(uploadFile) : null;

    const profiles = [
        <>
            <b>Full name: </b>
            <span>{profile?.full_name}</span>
        </>,
        <>
            <b>Email: </b>
            <span>{user?.email}</span>
        </>,
        <>
            <b>Gender: </b>
            <span>{profile?.gender}</span>
        </>,
        <>
            <b>Date of Birth: </b>
            <span>{profile?.dob}</span>
        </>,
        <>
            <b>Address: </b>
            <span>{profile?.address ?? 'Unknown'}</span>
        </>

    ]

    const beforeUpload = (file) => {
        return new Promise((resolve, reject) => {
            if (file.type.startsWith('image')) {
                message.success('File is valid!');
                reject('Success');
            } else {
                message.error('File has to be image');
                resolve('File has to be image');
            }
        })
    }

    const onChangeImage = (file) => {
        if (file.file.status === 'removed') {
            setUploadFile(null);
        } else {
            if (file.file.type?.startsWith('image')) {
                console.log(file.file);
                setUploadFile(file.file);
            }
        }
    }

    const handleChangeAvatar = async () => {
        if (uploadFile) {
            setIsLoading(true);
            const url = await uploadImageFirebase(uploadFile);
            onSuccess = () => {
                message.success('Change avatar successfully!');
                setIsOpenChangeAva(false);
            }
            mutate({ id: profile.id, studentChange: { avatar: url } });
            setIsLoading(false);
        }
    }


    const uploadImageFirebase = async (imageUpload) => {
        const newName = `${imageUpload.name + v4()}`
        const imageRef = ref(storage, `images/${newName}`);
        return await uploadBytes(imageRef, imageUpload)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then(link => link)
    }



    const onFinish = (value) => {
        const data = {
            ...value,
            dob: dayjs(value.dob).format('YYYY-MM-DD')
        }
        mutate({ id: profile.id, studentChange: data });
        console.log(isSuccess);
    }


    const validateDate = (value) => {
        console.log(value);
    }

    return (

        <>
            <h1 className='text-4xl font-semibold text-color-button mb-20' >My Profile</h1>
            <div className='flex w-full items-center'>
                <div className='basis-2/5 flex flex-col items-center mx-3'>
                    <Image
                        src={profile?.avatar}
                        className='rounded-2xl'
                        width={250}
                    >
                    </Image>
                    <Button className='bg-color-button my-5' type='primary' onClick={() => { setIsOpenChangeAva(true) }}>Change Avatar</Button>
                </div>
                <Space size={'large'} direction='vertical' className='basis-3/5 w-full mx-3'>
                    {profiles.map((p, i) => <div className='w-full border-b-2' key={i}>{p}</div>)}
                    <div className='flex justify-center'>
                        <Button className='bg-color-button' type='primary' onClick={() => { setIsOpenChangeProfile(true) }}>Edit Profile</Button>
                    </div>
                </Space>
            </div>
            <Modal title={'Change avatar'} open={isOpenChangeAva} onCancel={() => { setIsOpenChangeAva(false) }} footer={null}>
                <div className='flex flex-col'>
                    <div className='flex justify-center'>
                        <Image
                            src={url || profile?.avatar}
                            className='rounded-2xl my-5 mx-auto'
                            width={250}
                            placeholder='blur'
                        >
                        </Image>
                    </div>

                    <Upload
                        maxCount={1}
                        beforeUpload={beforeUpload}
                        accept={'.png,.jpg'}
                        onChange={onChangeImage}
                        className='mb-5'
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                    <Button
                        type={!isLoading && 'primary'}
                        className={!isLoading && 'bg-color-button'}
                        onClick={handleChangeAvatar}
                        size='large'
                    >
                        {isLoading ? <Spin /> : 'Change Avatar'}
                    </Button>
                </div>
            </Modal>
            <Modal title='Edit Profile' open={isOpenChangeProfile} onCancel={() => { setIsOpenChangeProfile(false) }} footer={null}>
                <Form
                    onFinish={onFinish}
                    style={{
                        maxWidth: 600,
                    }}
                    layout="vertical"
                >
                    <Form.Item
                        hasFeedback
                        label="Full Name"
                        name="full_name"
                        validateTrigger="onBlur"
                        rules={[
                            {
                                pattern: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                                message: 'Please enter your real full name',
                            },
                            {
                                required: true,
                            }
                        ]}
                        initialValue={profile?.full_name}
                    >
                        <Input placeholder="Example: Nguyen Quang Tu" />
                    </Form.Item>

                    {/* <Form.Item
                        hasFeedback
                        label="Email"
                        name="email"
                        validateTrigger="onBlur"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                            }
                        ]}
                        initialValue={user?.email}
                    >
                        <Input placeholder="Example: quangtu2301@gmail.com" />
                    </Form.Item> */}

                    <Form.Item
                        hasFeedback
                        label="Gender"
                        name="gender"
                        validateTrigger="onBlur"
                        rules={[
                            {
                                required: true,
                            }
                        ]}
                        initialValue={profile?.gender}
                    >
                        <Select
                            style={{ width: 120 }}
                            options={[
                                { value: 'Male', label: 'Male' },
                                { value: 'Female', label: 'Female' },
                                { value: 'Unknown', label: 'Unknown' }
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Date of Birth"
                        name="dob"
                        validateTrigger="onBlur"
                        initialValue={dayjs(profile?.dob)}
                    >
                        <DatePicker onChange={validateDate} />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Address"
                        name="address"
                        validateTrigger="onBlur"
                        initialValue={profile?.address}
                    >
                        <Input placeholder="Example: Cau Giay, Ha noi" />
                    </Form.Item>

                    <Form.Item className='flex justify-end' >
                        <Space>
                            <Button htmlType="submit" loading={loadingChange} type='primary' className='bg-color-button'>
                                Submit
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default MyProfile