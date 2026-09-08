<?php

namespace App\Http\Controllers\Attendance;

use App\Http\Controllers\Controller;
use App\Http\Requests\Attendance\CheckInAttendanceRequest;
use App\Models\Attendance;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class CheckInAttendanceController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CheckInAttendanceRequest $request)
    {
        Gate::authorize("attendance:check-in");
        $credentials = $request->validated();

        try {
            $user = Auth::user();
            if ($user->role->name !== "intern") {
                return redirect()
                    ->back()
                    ->with(
                        "error",
                        "Hanya intern yang dapat mencatat absensi masuk.",
                    );
            }

            $placement = $user->placementAsIntern->where("status", "active")->first();
            if (!$placement) {
                return redirect()
                    ->back()
                    ->with(
                        "error",
                        "Anda belum memiliki tempat kerja aktif.",
                    );
            }

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

            $credentials['attendance_date'] = now()->format('Y-m-d');
            $credentials['placement_id'] = $placement->id;
            $credentials['check_in_at'] = now();

            if ($credentials["status"] == "present" && now()->format('H:i:s') > $placement->program->work_start_time->format('H:i:s')) {
                $credentials['status'] = "late";
                $credentials['late_minutes'] = ceil(abs(now()->diffInMinutes($placement->program->work_start_time)));
            }

            $total_attendance = $placement->total_attendance + 1;
            $total_present = $placement->total_present + (in_array($credentials['status'], ["late", "present"]) ? 1 : 0);

            $placement->update([
                "total_attendance" => $total_attendance,
                "total_present" => $total_present,
                "avg_attendance" => number_format(($total_present / $total_attendance) * 100, 2),
            ]);

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
