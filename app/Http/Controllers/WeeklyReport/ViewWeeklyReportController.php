<?php

namespace App\Http\Controllers\WeeklyReport;

use App\Http\Controllers\Controller;
use App\Models\WeeklyReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ViewWeeklyReportController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('weekly-report:read');

        $search = $request->input('search');
        $filter = $request->input('filter');
        $key = $request->input('key');
        $availableKey = ['status'];

        if (! in_array($key, $availableKey)) {
            $key = '';
            $filter = '';
        }

        $data = WeeklyReport::hasRole(Auth::user())->with(['placement:id,intern_id','placement.intern:id,name', 'reviewedBy:id,name'])->when($search, function ($query, $search) {
            return $query->where('name', 'like', "%$search%");
        })->when($filter, function ($query) use ($key, $filter) {
            return $query->where($key, $filter);
        })->orderByDesc('created_at')->paginate(10)->withQueryString();

        $defaultDates = [
            'start' => now()->startOfWeek()->format('Y-m-d'),
            'end' => now()->endOfWeek()->format('Y-m-d'),
        ];

        return Inertia::render('WeeklyReport/WeeklyReportIndex', compact('data', 'defaultDates'));
    }

    public function show(WeeklyReport $weeklyReport)
    {
        Gate::authorize('WeeklyReport:read');

        return Inertia::render('WeeklyReport/WeeklyReportShow', compact('weeklyReport'));
    }
}
