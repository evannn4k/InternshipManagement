<?php

namespace App\Http\Controllers\WeeklyReport;

use App\Http\Controllers\Controller;
use App\Http\Requests\WeeklyReport\CreateWeeklyReportRequest;
use App\Models\WeeklyReport;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class CreateWeeklyReportController extends Controller
{
    public function __invoke(CreateWeeklyReportRequest $request)
    {
        Gate::authorize('weekly-report:create');
        $credentials = $request->validated();

        try {
            $placement = Auth::user()->placementAsIntern->where('status', 'active')->first();

            if (! $placement) {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Tidak ada penempatan yang aktif.',
                    );
            }

            $start = now()->startOfWeek()->format('Y-m-d');
            $end = now()->endOfWeek()->format('Y-m-d');

            $existsReport = WeeklyReport::where('placement_id', $placement->id)->whereDate('week_start_date', '>=', $start)->where('week_end_date', $end)->exists();

            if ($existsReport) {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Sudah membuat laporan minggu ini.',
                    );
            }

            $credentials['placement_id'] = $placement->id;
            $credentials['week_start_date'] = $start;
            $credentials['week_end_date'] = $end;
            $credentials['submitted_at'] = now();

            WeeklyReport::create($credentials);

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Berhasil menambah data laporan mingguan.',
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
