<?php

namespace App\Http\Controllers\Placement;

use App\Models\Placement;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Google\Service\Dataflow\WorkItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ViewPlacementController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('placement:read');

        $search = $request->input("search");
        $filter = $request->input("filter");

        $user =  Auth::user();

        $query = Placement::with("intern.school", "mentor", "program");

        if ($user->role_id === 2) {
            $query->where("mentor_id", $user->id);
        } elseif ($user->role_id !== 1) {
            $query->where("intern_id", $user->id);
        }

        $data = $query->when($search, function ($query, $search) {
            return $query->where('name', 'like',  "%$search%");
        })->when($filter, function ($query, $filter) {
            return $query->where('status', $filter);
        })->orderByDesc("created_at")->paginate(10)->withQueryString();

        $users = User::with('role')->get();
        $programs = Program::where("status", "active")->get();

        return Inertia::render("Placement/PlacementIndex", compact("data", "users", "programs"));
    }

    public function show(Placement $placement)
    {
        Gate::authorize('placement:read');

        $placement->load("intern", "mentor", "tasks", "attendance", "program", "weeklyReport", "evaluation.evaluator:id,name", "evaluation", "document");

        $total_attendance = $placement->attendance->count();

        $attendance = [];
        $start_date = Carbon::parse($placement->start_date);
        $end_date = now()->startOfDay();

        $period = CarbonPeriod::create($start_date, $end_date);
        $efective_days = 0;

        foreach ($period as $date) {
            $dayName = $date->locale('id')->isoFormat('dddd');

            if (in_array($dayName, $placement->program->working_days)) {
                $efective_days++;
            }
        }

        $attendance['attendance_percentage'] = round(($total_attendance / $efective_days) * 100);
        $attendance['efective_days'] = $efective_days;

        $attendance['present'] = $placement->attendance->whereIn('status', ['present', 'late'])->count();
        $attendance['sickAndPermitted'] = $placement->attendance->whereIn('status', ['permitted', 'sick'])->count();
        $attendance['absent'] = $placement->attendance->where('status', 'absent')->count();

        $task = [];
        $total_task = $placement->tasks->count();

        $task['completed'] = $placement->tasks->where('status', 'completed')->count();
        $task['in_progress'] = $placement->tasks->where('status', 'in_progress')->count();
        $task['pending'] = $placement->tasks->wherein('status', ['draft', 'assigned'])->count();

        $task['completion_rate'] = round(($task['completed'] / $total_task) * 100);
        $task['total'] = $total_task;

        return Inertia::render("Placement/PlacementShow", compact("placement", "attendance", "task"));
    }
}
