<?php

namespace App\Http\Controllers\WeeklyReport;

use App\Http\Controllers\Controller;
use App\Http\Requests\WeeklyReport\UpdateWeeklyReportRequest;
use App\Models\WeeklyReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class UpdateWeeklyReportController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateWeeklyReportRequest $request, WeeklyReport $weeklyReport)
    {
        Gate::authorize('weekly-report:update');
        $credentials = $request->validated();

        try {
            if($weeklyReport->status !== "submitted" || $weeklyReport->status!== "revision_requested") {
                return redirect()
                ->back()
                ->with(
                    'error',
                    'Laporan tidak valid.',
                );
            }

            $credentials['status'] = 'submitted';
            $weeklyReport->update($credentials);    

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Berhasil mengubah data laporan mingguan.',
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
