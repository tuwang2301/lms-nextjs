'use client'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'

const Forbidden = () => {
    const router = useRouter();

    const handleHome = () => {
        router.push('/');
    }

    return (
        <div className='flex flex-col items-center my-10'>
            <h1 className='text-9xl my-5 text-red-900 font-extrabold '>403</h1>
            <h2 className='text-5xl my-5 text-red-900 font-semibold '>Access Forbidden</h2>
            <h3 className='text-2xl my-5 font-medium '>You are not allowed to go to this page</h3>
            <Button size='large' danger onClick={handleHome}>Go Home</Button>
        </div>
    )
}

export default Forbidden