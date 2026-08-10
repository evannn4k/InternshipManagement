<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class CreateUserController extends Controller
{
    public function __invoke(CreateUserRequest $request)
    {
        Gate::authorize("user:create");
        $credentials = $request->validated();

        try {
            User::create($credentials);
            
            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil membuat data akun.",
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
