import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBbwGdG1Kwn5bQ0fg1GcgmAeFNnPjGObNA",
    authDomain: "uploadingfile-59a57.firebaseapp.com",
    projectId: "uploadingfile-59a57",
    storageBucket: "uploadingfile-59a57.appspot.com",
    messagingSenderId: "24726064288",
    appId: "1:24726064288:web:febaa32e0ab7a3fb684dc5",
    measurementId: "G-PTDH9CXVSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)
export const messaging = getMessaging(app)

export const requestPermission = () => {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            return getToken(messaging, {
                vapidKey:
                    'BA2pCq7MfWvuwJbQ8RpNq4ny36bMtAgXmtu2wNIrsBRxRbAEXmjDAjZPOEzDUSUnbX221yzOc8dx1t9L7NMqahM'

            })
                .then(currentToken => {
                    if (currentToken) {
                        console.log('Client token: ', currentToken);
                    } else {
                        console.log('Failed to generate the app registration token.');
                    }
                })
                .catch(err => {
                    console.log(
                        'An error occurred when requesting to receive the token.', err
                    );
                });
        } else {
            console.log("User permission denied");
        }
    });
};

requestPermission();

export const onMessageListener = () =>
    new Promise(
        resolve => {
            onMessage(messaging, payload => {
                resolve(payload)
            })
        }
    )