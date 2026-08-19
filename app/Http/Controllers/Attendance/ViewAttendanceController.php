<?php

namespace App\Http\Controllers\Attendance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use App\Models\Attendance;
use App\Models\Placement;
use Illuminate\Support\Facades\Auth;

class ViewAttendanceController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('attendance:read');

        $search = $request->input("search");
        $filter = $request->input("filter");
        $key = $request->input("key");

        $data = Attendance::hasRole(Auth::user())->with(['placement.intern:id,name'])->when($search, function ($query, $search) {
            return $query->where('title', 'like',  "%$search%");
        })->when($filter, function ($query) use ($key, $filter) {
            return $query->where($key, $filter);
        })->orderByDesc("created_at")->paginate(10)->withQueryString();

        $placements = Placement::with(['intern:id,name', 'program:id,name'])->select('id', 'intern_id', 'mentor_id', 'program_id', 'status')->where("status", "active")->get();

        return Inertia::render("Attendance/AttendanceIndex", compact("data", "placements"));
    }

    public function show(Attendance $attendance)
    {
        Gate::authorize('attendance:read');

        return Inertia::render("Attendance/AttendanceShow", compact("attendance"));
    }
}
