<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Document;
use App\Models\Evaluation;
use App\Models\Placement;
use App\Models\Program;
use App\Models\School;
use App\Models\Task;
use App\Models\User;
use App\Models\WeeklyReport;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $data = [];
        $tasks = [];
        $attendances = [];
        $chartData = [];
        $role = Auth::user()->role->name;

        if (Auth::user()->role->name == "admin") {
            $data['total_intern'] = User::where("is_active", 1)->whereHas('role', fn($r) => $r->where("name", "intern"))->count();
            $data['total_task'] = Task::count();
            $data['total_overdue_task'] = Task::whereNotNull("due_date")->where("due_date", "<", now())->count();
            $data['total_school'] = School::where("is_active", 1)->count();
            $data['total_program'] = Program::where("status", "active")->count();
            $data['total_evaluation'] = Evaluation::count();
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
        } elseif (Auth::user()->role->name == "mentor") {
            $data['assign_active_intern'] = Placement::where("mentor_id", Auth::user()->id)->where("status", "active")->count();
            $data['overdue_task'] = Task::whereHas("placement", function ($placement) {
                $placement->where('mentor_id', Auth::id());
            })->whereNotNull("due_date")->where("due_date", "<", now())->count();
            $data['task_awaiting_review'] = Task::whereHas("placement", function ($placement) {
                $placement->where('mentor_id', Auth::id());
            })->where("status", "submitted")->count();
            $data['report_awaiting_review'] = WeeklyReport::whereHas("placement", function ($placement) {
                $placement->where('mentor_id', Auth::id());
            })->where("status", "submitted")->count();

            $tasks = Task::with("placement:id,intern_id", "placement.intern:id,name")->whereHas("placement", function ($query) {
                $query->where('mentor_id', Auth::user()->id);
            })->orderBy("created_at")->limit(10)->get();
            $attendances = Attendance::select("id", "placement_id", "status", "attendance_date")->with("placement:id,intern_id", "placement.intern:id,name")->whereHas("placement", function ($query) {
                $query->where('mentor_id', Auth::user()->id);
            })->orderBy("created_at")->limit(10)->get();

            $chartAttendance = Attendance::whereHas("placement", function ($query) {
                $query->where("mentor_id", Auth::user()->id);
            })->whereBetween("attendance_date", [now()->subDays(7)->format('d-m-Y'), now()->format('d-m-Y')])->orderBy("attendance_date")->get()->groupBy(function ($att) {
                Carbon::setLocale('id');
                return Carbon::parse($att->attendance_date)->translatedFormat("l");
            })->map(function ($g) {
                return [
                    "total_present" => $g->whereIn("status", ['present', 'late'])->count(),
                    "total_absent" => $g->whereIn("status", ['absent', 'permitted', 'sick'])->count()
                ];
            });

            $chartTask = Task::whereHas("placement", function ($query) {
                $query->where("mentor_id", Auth::user()->id);
            })->whereBetween("started_at", [now()->subDays(7), now()])->orderBy("started_at")->get()->groupBy(function ($att) {
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
        } else {
            $latestEvaluation = Auth::user()->activePlacement->evaluation()->latest()->first();
            $latestAvgEaluationScore = $latestEvaluation ? (($latestEvaluation->reliability_score +
                $latestEvaluation->learning_score +
                $latestEvaluation->code_quality_score +
                $latestEvaluation->problem_solving_score +
                $latestEvaluation->collaboration_score +
                $latestEvaluation->communication_score +
                $latestEvaluation->documentation_score) / 7) : 0;

            $data['latest_evaluation_avg'] = $latestAvgEaluationScore;
            $data['attendance_percentage'] = Auth::user()->activePlacement->avg_attendance;
            $data['overdue_task'] = Auth::user()->activePlacement->tasks->whereNotNull("due_date")->where("due_date", "<", now())->count();
            $data['active_task'] = Auth::user()->activePlacement->tasks->where("status", "in_progress")->count();

            $tasks = Task::with("placement:id,intern_id", "placement.intern:id,name")->whereHas("placement", function ($query) {
                $query->where('intern_id', Auth::user()->id);
            })->orderBy("created_at")->limit(10)->get();
            $attendances = Attendance::select("id", "placement_id", "status", "attendance_date")->with("placement:id,intern_id", "placement.intern:id,name")->whereHas("placement", function ($query) {
                $query->where('intern_id', Auth::user()->id);
            })->orderBy("created_at")->limit(10)->get();
        }

        return Inertia::render("Dashboard/Dashboard", compact("data", "role", "tasks", "attendances", "chartData"));
    }
}
