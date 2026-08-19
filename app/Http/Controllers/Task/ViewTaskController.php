<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Models\Placement;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ViewTaskController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('task:read');

        $search = $request->input("search");
        $filter = $request->input("filter");
        $key = $request->input("key");
        $availableKey = ['status', 'priority'];

        if (!in_array($key, $availableKey)) {
            $key = "";
            $filter = "";
        };

        $data = Task::hasRole(Auth::user())->with(['placement.intern:id,name'])->when($search, function ($query, $search) {
            return $query->where('title', 'like',  "%$search%");
        })->when($filter, function ($query) use ($key, $filter) {
            return $query->where($key, $filter);
        })->orderByDesc("created_at")->paginate(10)->withQueryString();

        $placements = Placement::with(['intern:id,name', 'program:id,name'])->select('id', 'intern_id', 'mentor_id', 'program_id', 'status')->where("status", "active")->get();

        return Inertia::render("Task/TaskIndex", compact("data", "placements"));
    }

    public function show($task)
    {
        $task = Task::with(['placement.intern:id,name', 'placement.mentor:id,name', 'reviewedBy:id,name', 'createdBy:id,name'])->findOrFail($task);

        Gate::authorize('task:read');

        return Inertia::render("Task/TaskShow", compact("task"));
    }
}
