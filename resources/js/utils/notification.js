import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";
import { router } from "@inertiajs/react";

export async function requestNotificationPermission() {
    try {
        // 1. Daftarkan service worker dulu secara manual
        const registration = await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js",
        );

        // 2. Minta izin ke user (browser akan munculkan popup native)
        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
            console.log("User menolak izin notifikasi.");
            return null;
        }

        // 3. Ambil FCM Token, dengan VAPID key dari Firebase Console
        const token = await getToken(messaging, {
            vapidKey: "BBv_UsZ51kSgHMKYcv9XbhVF1RzGRSHHo9cg2JFXS012sZ6ISb3zc9fBorpGDXKM3pYeQ5jlhLaXNDrUv6AyoFY",
            serviceWorkerRegistration: registration,
        });

        if (!token) {
            console.log("Gagal mendapatkan token.");
            return null;
        }

        console.log("FCM Token:", token);

        // 4. Kirim token ini ke Laravel backend
        await sendTokenToBackend(token);

        return token;
    } catch (error) {
        console.error("Error saat request permission:", error);
        return null;
    }
}

function sendTokenToBackend(token) {
    router.post("/fcm-token", { fcm_token: token });
}
