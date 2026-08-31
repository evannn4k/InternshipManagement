import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCsaIE-F03MqefZNfpJirpUyewXzrvWFs8",
    authDomain: "internship-management-b9b62.firebaseapp.com",
    projectId: "internship-management-b9b62",
    storageBucket: "internship-management-b9b62.firebasestorage.app",
    messagingSenderId: "63683637088",
    appId: "1:63683637088:web:4a06ce62d5d5d0f33cf805",
    measurementId: "G-6MNWV7ENVF"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestFcmToken = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") return null;

        const currentToken = await getToken(messaging, {
            vapidKey: "BBv_UsZ51kSgHMKYcv9XbhVF1RzGRSHHo9cg2JFXS012sZ6ISb3zc9fBorpGDXKM3pYeQ5jlhLaXNDrUv6AyoFY",
        });

        if (currentToken) {
            router.post('/fcm-token', {
                fcm_token: currentToken
            }, {
                preserveScroll: true,
                preserveState: true,
            });
        }

        return currentToken ?? null
    } catch (err) {
        console.error("Gagal mendapatkan FCM token:", err);
        return null;
    }
};

export { messaging, onMessage };


// import { router } from "@inertiajs/react";
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken } from "firebase/messaging";

// const firebaseConfig = {
//     apiKey: "AIzaSyCsaIE-F03MqefZNfpJirpUyewXzrvWFs8",
//     authDomain: "internship-management-b9b62.firebaseapp.com",
//     projectId: "internship-management-b9b62",
//     storageBucket: "internship-management-b9b62.firebasestorage.app",
//     messagingSenderId: "63683637088",
//     appId: "1:63683637088:web:4a06ce62d5d5d0f33cf805",
//     measurementId: "G-6MNWV7ENVF"
// };

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// const VAPID_KEY = "BBv_UsZ51kSgHMKYcv9XbhVF1RzGRSHHo9cg2JFXS012sZ6ISb3zc9fBorpGDXKM3pYeQ5jlhLaXNDrUv6AyoFY";

// export async function initFcmToken() {
//     try {
//         // 1. Minta izin notifikasi browser
//         const permission = await Notification.requestPermission();

//         if (permission === 'granted') {
//             // 2. Ambil token dari Firebase
//             const currentToken = await getToken(messaging, { fcm_token: VAPID_KEY });

//             if (currentToken) {
//                 // 3. Kirim ke Laravel via Inertia router tanpa reload halaman!
//                 router.post(route('fcm.token'), {
//                     fcm_token: currentToken
//                 }, {
//                     preserveScroll: true,
//                     preserveState: true,
//                 });
//             }
//         }
//     } catch (err) {
//         console.error('Gagal mendapatkan FCM Token:', err);
//     }
// }