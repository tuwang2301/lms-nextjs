import React, { useEffect, useState } from 'react'
import { onMessageListener, requestPermission } from '../app/firebase';
import { ToastContainer, toast } from 'react-toastify';

const Notification = () => {
    const [notification, setNotification] = useState({ title: '', body: '' });

    useEffect(() => {
        requestPermission();

        const unsubcrice = onMessageListener().then(payload => {
            setNotification({
                title: payload?.notification?.title,
                body: payload?.notification?.body
            });
            toast(`🦄 ${payload?.notification?.title}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });

        return () => {
            unsubcrice.catch(error => console.log('failed: ', error));
        }
    }, [])
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
        </div>
    )
}

export default Notification