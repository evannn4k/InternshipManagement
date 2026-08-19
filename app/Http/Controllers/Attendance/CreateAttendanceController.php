<?php

namespace App\Http\Controllers\Attendance;

use App\Http\Controllers\Controller;
use App\Http\Requests\Attendance\CreateAttendanceRequest;
use App\Models\Attendance;
use App\Models\Placement;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class CreateAttendanceController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CreateAttendanceRequest $request)
    {
        Gate::authorize("attendance:create");
        $credentials = $request->validated();

        try {
            $placement = Placement::findOrFail($credentials['placement_id']);

            $attendance = $placement->attendance()->where("attendance_date", now()->format('Y-m-d'))->first();
            if ($attendance) {
                return redirect()
                    ->back()
                    ->with(
                        "error",
                        "Anda sudah mencatat absensi masuk pada hari ini.",
                    );
            }

            if (!in_array(now()->locale('id')->dayName, $placement->program->working_days ?? [])) {
                return redirect()
                    ->back()
                    ->with(
                        "error",
                        "Hari ini tidak dapat mencatat absensi masuk.",
                    );
            }

            if ($credentials['status'] === "late" && Carbon::parse($credentials['check_in_at'])->format('H:i') > $placement->program->work_start_time->format('H:i')) {
                $credentials['late_minutes'] = abs(now()->diffInMinutes($placement->program->work_start_time));
            }

            Attendance::create($credentials);

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil mencatat absensi masuk.",
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
