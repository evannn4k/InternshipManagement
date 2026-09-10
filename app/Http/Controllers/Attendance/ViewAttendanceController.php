<?php

namespace App\Http\Controllers\Attendance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use App\Models\Attendance;
use App\Models\Placement;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ViewAttendanceController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('attendance:read');

        $search = $request->input("search");
        $filter = $request->input("filter");
        $key = $request->input("key");
        $availableKey = ['status'];

        if (!in_array($key, $availableKey)) {
            $key = "";
            $filter = "";
        };

        $data = Attendance::hasRole(Auth::user())->with(['placement.intern:id,name'])->when($search, function ($query, $search) {
            return $query->whereHas("placement.intern", function ($q) use ($search) {
                return $q->where('name', 'like',  "%$search%");
            });
        })->when($filter, function ($query) use ($key, $filter) {
            return $query->where($key, $filter);
        })->orderByDesc("created_at")->paginate(10)->withQueryString();

        $placements = Placement::with(['intern:id,name', 'program:id,name'])->select('id', 'intern_id', 'mentor_id', 'program_id', 'status')->where("status", "active")->get();

        return Inertia::render("Attendance/AttendanceIndex", compact("data", "placements"));
    }

    public function show(Attendance $attendance)
    {
        Gate::authorize('attendance:read');

        $attendance->load([
            'correctedBy:id,name',
            'placement:id,intern_id,mentor_id,program_id',
            'placement.intern:id,name',
            'placement.mentor:id,name',
            'placement.program:id,name',
        ]);

        return Inertia::render("Attendance/AttendanceShow", compact("attendance"));
    }

    public function summary()
    {
        Gate::authorize('attendance:read');

        $data = User::with(['activePlacement', 'activePlacement.program:id,name', 'activePlacement.attendance'])->whereHas("role", function ($r) {
            return $r->where("name", "intern");
        })->paginate();

        $attendance = [];
        $avg = Placement::whereHas("intern.role", fn($r) => $r->name = "intern")->selectRaw("SUM(total_attendance) as total_attendance, SUM(total_present) as total_present")->first();

        $attendance['total_attendance'] = $avg->total_attendance;
        $attendance['total_present'] = $avg->total_present;
        $attendance['avg'] = $avg->total_attendance || $avg->total_present ? number_format($avg->total_present / $avg->total_attendance * 100, 2) : 0;

        return Inertia::render("Attendance/AttendanceSummary", compact("data", "attendance"));
    }
}
