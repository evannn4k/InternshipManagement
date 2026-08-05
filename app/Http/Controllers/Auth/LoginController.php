<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(LoginRequest $request)
    {
        $credentials = $request->validated();
        try {
            if (
                $user = User::where(["email" => $credentials["email"]])->first()
            ) {
                if (
                    !password_verify($credentials["password"], $user->password)
                ) {
                    return back()->with("error", "Email atau Password salah");
                }

                if (!$user->is_active) {
                    return back()->with("error", "Akun anda belum diaktifkan");
                }

                $user->last_login_at  = now();
                $user->save();

                Auth::login($user);
                $request->session()->regenerate();

                return redirect()->intended("/dashboard");
            } else {
                return back()->with("error", "Email atau Password salah");
            }
        } catch (\Exception $e) {
            Log::error("Error : " . $e->getMessage());

            return redirect()
                ->back()
                ->with(
                    "error",
                    "terjadi kesalahan sistem. Silahkan coba lagi.",
                );
        }
    }
}
