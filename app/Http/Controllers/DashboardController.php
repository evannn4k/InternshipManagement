<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Document;
use App\Models\Task;
use App\Models\User;
use App\Models\WeeklyReport;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $data = [];

        $data['total_intern'] = User::whereHas('role', fn($r) => $r->where("name", "intern"))->count();
        $data['total_task'] = Task::count();
        $data['total_report'] = WeeklyReport::where("status", "approved")->count();
        $data['total_document'] = Document::where("status", "accepted")->count();

        $tasks = Task::with("placement:id,intern_id", "placement.intern:id,name")->orderBy("created_at")->limit(10)->get();
        $attendances = Attendance::select("id", "placement_id", "status", "attendance_date")->with("placement:id,intern_id", "placement.intern:id,name")->orderBy("created_at")->limit(10)->get();

        $chartAttendance = Attendance::whereBetween("attendance_date", [now()->subDays(7)->format('d-m-Y'), now()->format('d-m-Y')])->orderBy("attendance_date")->get()->groupBy(function ($att) {
            Carbon::setLocale('id');
            return Carbon::parse($att->attendance_date)->translatedFormat("l");
        })->map(function ($g) { 
            return [
                "total_present" => $g->whereIn("status", ['present', 'late'])->count(),
                "total_absent" => $g->whereIn("status", ['absent', 'permitted', 'sick'])->count()
            ];
        });

        $chartTask = Task::whereBetween("started_at", [now()->subDays(7), now()])->orderBy("started_at")->get()->groupBy(function ($att) {
            Carbon::setLocale('id');
            return Carbon::parse($att->started_at)->translatedFormat("l");
        })->map(function ($g) {
            return [
                "total_task" => $g->count(),
                "total_completed" => $g->where("status", "completed")->count()
            ];
        });

        $chartData = [
            "chartAttendance"  => $chartAttendance,
            "chartTask"  => $chartTask
        ];

        return Inertia::render("Dashboard/Dashboard", compact("data", "tasks", "attendances", "chartData"));
    }
}
