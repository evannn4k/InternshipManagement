<?php

namespace App\Http\Controllers\Attendance;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class CheckOutAttendanceController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Attendance $attendance)
    {
        Gate::authorize("attendance:check-out");

        try {
            $user = Auth::user();
            if ($user->role->name !== "intern") {
                return redirect()
                    ->back()
                    ->with(
                        "error",
                        "Hanya intern yang dapat mencatat absensi keluar.",
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

            if($attendance->check_out_at) {
                return redirect()
                    ->back()
                    ->with(
                        "error",
                        "Anda sudah mencatat absensi keluar.",
                    );
            }

            $attendance->check_out_at = now();
            $attendance->save();

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil mencatat absensi keluar.",
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
