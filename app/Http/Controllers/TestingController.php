<?php

namespace App\Http\Controllers;

use App\Notifications\FcmNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TestingController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request)
    {
        return redirect()->intended('/login');
    }

    public function notif(Request $request)
    {
        $intern = Auth::user();

        try {
            $intern->notify(new FcmNotification(title: "Ada Tugas Baru", body: "test aja sih"));
            Log::info('Notif berhasil dikirim ke: ' . $intern->fcm_token);
        } catch (\Exception $e) {
            Log::error('Gagal kirim notif: ' . $e->getMessage());
        }

        return redirect()
            ->back()
            ->with(
                "success",
                "Berhasil mengirim notifikasi.",
            );
    }
}
