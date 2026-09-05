<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdateProfileRequest;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class UpdateProfileController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateProfileRequest $request)
    {
        Gate::authorize("user:update");
        $credentials = $request->validated();

        try {
            $user = $request->user();

            if (empty($credentials['password'])) {
                unset($credentials['password']);
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
