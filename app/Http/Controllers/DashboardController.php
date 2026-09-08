<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Document;
use App\Models\Task;
use App\Models\User;
use App\Models\WeeklyReport;
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
        $attendances = Attendance::with("placement:id,intern_id", "placement.intern:id,name")->orderBy("created_at")->limit(10)->get();

        return Inertia::render("Dashboard/Dashboard", compact("data", "tasks", "attendances"));
    }
}
