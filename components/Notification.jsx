import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { requestPermission, onMessageListener } from '../app/firebase';

const Notification = () => {
    const [notification, setNotification] = useState({ title: '', body: '', img: '' });
    const notify = () => toast(<ToastDisplay />);
    function ToastDisplay() {
        return (
            <div className='display flex justify-between'>
                <img className='w-20 me-3' src={notification.img} />
                <div>
                    <p><b>{notification?.title}</b></p>
                    <p>{notification?.body}</p>
                </div>
            </div>
        );
    };

    useEffect(() => {
        if (notification?.title) {
            notify()
        }
    }, [notification])

    requestPermission();

    onMessageListener()
        .then((payload) => {
            setNotification({ title: payload?.notification?.title, body: payload?.notification?.body, img: payload?.notification?.image });
        })
        .catch((err) => console.log('failed: ', err));

    return (
        <Toaster />
    )
}

export default Notification