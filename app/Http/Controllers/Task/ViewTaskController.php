<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ViewTaskController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('task:read');

        $search = $request->input("search");
        $filter = $request->input("filter");

        $data = Task::when($search, function ($query, $search) {
            return $query->where('title', 'like',  "%$search%");
        })->when($filter, function ($query, $filter) {
            return $query->where('status', $filter);
        })->paginate(10)->withQueryString();

        return Inertia::render("Task/TaskIndex", compact("data"));
    }

    public function show(Task $task)
    {
        Gate::authorize('task:read');

        return Inertia::render("Task/TaskShow", compact("task"));
    }
}
