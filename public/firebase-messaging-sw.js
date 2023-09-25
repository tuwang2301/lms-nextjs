importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

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
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});