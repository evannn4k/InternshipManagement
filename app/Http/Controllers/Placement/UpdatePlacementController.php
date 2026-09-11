<?php

namespace App\Http\Controllers\Placement;

use App\Http\Controllers\Controller;
use App\Http\Requests\Placement\UpdatePlacementRequest;
use App\Models\Activity;
use App\Models\Placement;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class UpdatePlacementController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdatePlacementRequest $request, Placement $placement)
    {
        Gate::authorize("placement:update");
        $credentials = $request->validated();

        try {
            if ($placement->status == "terminate" || $placement->status == "completed") {
                return redirect()
                    ->back()
                    ->with(
                        "error",
                        "Penempatan tidak valid.",
                    );
            }

            if ($placement->mentor_id != $credentials['mentor_id']) {
                $activity = [
                    "user_id" => Auth::user()->id,
                    "action" => "Change placement mentor",
                    "subject" => "placement",
                    "subject_id" => $placement->mentor_id,
                    "old_value" => $placement->mentor_id,
                    "new_value" => $credentials['mentor_id'],
                    "ip_address" =>  $request->ip()
                ];

                Activity::create($activity);
            }

            $placement->update($credentials);

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil menambah mengubah data penempatan.",
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
