<?php

namespace App\Http\Controllers\WeeklyReport;

use App\Http\Controllers\Controller;
use App\Models\WeeklyReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class SubmitWeeklyReportController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(WeeklyReport $weeklyReport)
    {
        Gate::authorize('weekly-report:create');
        $credentials = [];

        try {
            if ($weeklyReport->status !== 'draft') {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Laporan tidak valid.',
                    );
            }

            $credentials['status'] = 'submitted';
            $credentials['submitted_at'] = now();

            $weeklyReport->update($credentials);

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Berhasil submit laporan mingguan.',
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
