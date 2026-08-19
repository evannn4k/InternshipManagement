<?php

namespace App\Http\Controllers\Attendance;

use App\Http\Controllers\Controller;
use App\Http\Requests\Attendance\UpdateAttendanceRequest;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class UpdateAttendanceController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateAttendanceRequest $request, Attendance $attendance)
    {
        Gate::authorize("attendance:update");
        $credentials = $request->validated();

        try {
            $placement = $attendance->placement;

            if (!in_array(now()->locale('id')->dayName, $placement->program->working_days ?? [])) {
                return redirect()
                    ->back()
                    ->with(
                        "error",
                        "Hari ini tidak dapat mencatat absensi masuk.",
                    );
            }

            $credentials['corrected_by'] = Auth::user()->id;

            if ($credentials['status'] === "late" && Carbon::parse($credentials['check_in_at'])->format('H:i') > $placement->program->work_start_time->format('H:i')) {
                $credentials['late_minutes'] = abs(now()->diffInMinutes($placement->program->work_start_time));
            } else {
                $credentials['late_minutes'] = null;
            }

            $attendance->update($credentials);

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil mengubah absensi masuk.",
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
