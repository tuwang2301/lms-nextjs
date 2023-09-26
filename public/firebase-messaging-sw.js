// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBbwGdG1Kwn5bQ0fg1GcgmAeFNnPjGObNA",
    authDomain: "uploadingfile-59a57.firebaseapp.com",
    projectId: "uploadingfile-59a57",
    storageBucket: "uploadingfile-59a57.appspot.com",
    messagingSenderId: "24726064288",
    appId: "1:24726064288:web:febaa32e0ab7a3fb684dc5",
    measurementId: "G-PTDH9CXVSF"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//     console.log('Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//     };

//     self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });