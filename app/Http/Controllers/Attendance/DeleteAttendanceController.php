<?php

namespace App\Http\Controllers\Attendance;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class DeleteAttendanceController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Attendance $attendance)
    {
        Gate::authorize("attendance:delete");
        
        try {
            $attendance->delete();

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil menghapus data absensi.",
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
