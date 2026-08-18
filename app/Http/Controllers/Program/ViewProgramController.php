<?php

namespace App\Http\Controllers\Program;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use App\Models\Program;

class ViewProgramController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('program:read');

        $search = $request->input("search");
        $filter = $request->input("filter");

        $data = Program::with('user')->when($search, function ($query, $search) {
            return $query->where('name', 'like',  "%$search%");
        })->when($filter, function ($query, $filter) {
            return $query->where('status', $filter);
        })->paginate(10)->withQueryString();

        return Inertia::render("Program/ProgramIndex", compact("data"));
    }

    public function show(Program $program)
    {
        Gate::authorize('program:read');

        return Inertia::render("Program/ProgramShow", compact("program"));
    }
}
