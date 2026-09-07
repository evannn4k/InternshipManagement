importScripts(
    "https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js",
);
importScripts(
    "https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
    apiKey: "AIzaSyCsaIE-F03MqefZNfpJirpUyewXzrvWFs8",
    authDomain: "internship-management-b9b62.firebaseapp.com",
    projectId: "internship-management-b9b62",
    storageBucket: "internship-management-b9b62.firebasestorage.app",
    messagingSenderId: "63683637088",
    appId: "1:63683637088:web:ca9ee2559bc8dfba3cf805",
    measurementId: "G-GBE5P5XSK3",
});

const messaging = firebase.messaging();

// Handler ini yang bertugas nampilin notifikasi
// KETIKA TAB WEB SEDANG TIDAK AKTIF / DI-MINIMIZE (background)
messaging.onBackgroundMessage((payload) => {
    console.log("Notifikasi diterima di background: ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/storage/images/main/logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
