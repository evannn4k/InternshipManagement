<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(RegisterRequest $request)
    {
        $credentials = $request->validated();

        try {
            $user = User::create($credentials);

            return redirect()->route("login")->with('success', 'Berhasil mendaftarkan akun!');
        } catch (\Exception $e) {
            Log::error('Error : '.$e->getMessage());

            return redirect()->back()->with('error', 'terjadi kesalahan sistem. Silahkan coba lagi.');
        }
    }
}
