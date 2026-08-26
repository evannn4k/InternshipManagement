<?php

namespace App\Http\Controllers\WeeklyReport;

use App\Http\Controllers\Controller;
use App\Models\WeeklyReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class DeleteWeeklyReportController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(WeeklyReport $weeklyReport)
    {
        Gate::authorize('weekly-report:delete');

        try {
            $weeklyReport->delete();

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Berhasil menghapus laporan mingguan.',
                );
        } catch (\Exception $e) {
            Log::error('Error : '.$e->getMessage());

            return redirect()
                ->back()
                ->with(
                    'error',
                    'terjadi kesalahan sistem. Silahkan coba lagi.',
                );
        }
    }
}
