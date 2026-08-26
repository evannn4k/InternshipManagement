<?php

namespace App\Http\Controllers\WeeklyReport;

use App\Http\Controllers\Controller;
use App\Http\Requests\WeeklyReport\RevisionWeeklyReportRequest;
use App\Models\WeeklyReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class RevisionWeeklyReportController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(RevisionWeeklyReportRequest $request, WeeklyReport $weeklyReport)
    {
        Gate::authorize('weekly-report:review');
        $credentials = $request->validated();

        try {
            if ($weeklyReport->status !== 'submitted') {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Laporan tidak valid.',
                    );
            }

            $credentials['status'] = 'revision_requested';
            $credentials['reviewed_at'] = now();
            $credentials['reviewed_by'] = Auth::user()->id;

            $weeklyReport->update($credentials);

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Berhasil meminta revisi laporan.',
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
