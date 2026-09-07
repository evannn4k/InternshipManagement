// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCsaIE-F03MqefZNfpJirpUyewXzrvWFs8",
    authDomain: "internship-management-b9b62.firebaseapp.com",
    projectId: "internship-management-b9b62",
    storageBucket: "internship-management-b9b62.firebasestorage.app",
    messagingSenderId: "63683637088",
    appId: "1:63683637088:web:ca9ee2559bc8dfba3cf805",
    measurementId: "G-GBE5P5XSK3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const messaging = getMessaging(app);
