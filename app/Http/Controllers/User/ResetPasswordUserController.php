<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\ResetPasswordUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class ResetPasswordUserController extends Controller
{
    public function __invoke(ResetPasswordUserRequest $request, User $user)
    {
        Gate::authorize("user:update");
        $credentials = $request->validated();

        try {
            $user->password = Hash::make($credentials['password']);
            $user->save();

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil mengubah data pengguna.",
                );
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
