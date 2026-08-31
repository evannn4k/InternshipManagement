importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyCsaIE-F03MqefZNfpJirpUyewXzrvWFs8",
    authDomain: "internship-management-b9b62.firebaseapp.com",
    projectId: "internship-management-b9b62",
    storageBucket: "internship-management-b9b62.firebasestorage.app",
    messagingSenderId: "63683637088",
    appId: "1:63683637088:web:4a06ce62d5d5d0f33cf805",
    measurementId: "G-6MNWV7ENVF"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification("Internship Management", {
        body: payload.notification.body,
        // icon: "/icon.png",
    });
});