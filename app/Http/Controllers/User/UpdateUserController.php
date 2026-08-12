<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class UpdateUserController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateUserRequest $request, User $user)
    {
        Gate::authorize("user:update");
        $credentials = $request->validated();
        
        try {
            // dd($credentials);   
            if ($credentials["role_id"] != 3) {
                $credentials["school_id"] = null;
            }
            
            if (isset($credentials['avatar'])) {
                $avatar = ImageService::save("user/", $credentials['avatar'], $user?->avatar);
                $credentials['avatar'] = $avatar;
            }

            $user->update($credentials);

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
