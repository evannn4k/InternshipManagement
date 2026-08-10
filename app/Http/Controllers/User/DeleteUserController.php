<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class DeleteUserController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(User $user)
    {
        Gate::authorize("user:delete");

        try {
            $user->delete();

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil menghapus data pengguna.",
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
