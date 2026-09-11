<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\Activity;
use App\Models\User;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            if ($credentials["role_id"] != 3) {
                $credentials["school_id"] = null;
            }

            if (isset($credentials['avatar'])) {
                $avatar = ImageService::save("user/", $credentials['avatar'], $user?->avatar);
                $credentials['avatar'] = $avatar;
            }

            if ($user->is_active != $credentials['is_active']) {
                $activity = [
                    "user_id" => Auth::user()->id,
                    "action" => "Change status user",
                    "subject" => "user  ",
                    "subject_id" => $user->id,
                    "old_value" => $user->is_active ? "Aktif" : "Tidak aktif",
                    "new_value" => $credentials['is_active'] ? "Aktif" : "Tidak aktif",
                    "ip_address" =>  $request->ip()
                ];

                Activity::create($activity);
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
