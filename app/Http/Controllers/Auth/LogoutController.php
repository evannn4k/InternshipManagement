<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LogoutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        try {
            Auth::logout();
            $request->session()->invalidate();

            return redirect()->route('login')->with('success', 'Berhasil logout');
        } catch (\Exception $e) {
            Log::error('Error : '.$e->getMessage());

            return redirect()->back()->with('error', 'terjadi kesalahan sistem. Silahkan coba lagi.');
        }
    }
}
