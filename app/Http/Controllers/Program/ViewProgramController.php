<?php

namespace App\Http\Controllers\Program;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use App\Models\Program;
use App\Models\User;

class ViewProgramController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('program:read');

        $search = $request->input("search");
        $filter = $request->input("filter");

        $data = Program::with(['createdBy'])->when($search, function ($query, $search) {
            return $query->where('name', 'like',  "%$search%");
        })->when($filter, function ($query, $filter) {
            return $query->where('status', $filter);
        })->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return Inertia::render("Program/ProgramIndex", compact("data"));
    }

    public function show(Program $program)
    {
        Gate::authorize('program:read');

        $program->load(['placements.mentor', 'placements.intern']);

        $mentors = User::select(['id', 'name'])->whereHas("placementAsMentor", function ($query) use ($program) {
            return $query->where('program_id', $program->id);
        })->get();

        $interns = User::select(['id', 'name'])->with(['placementAsIntern' => function ($query) {
            return $query->select(['id', 'mentor_id', 'intern_id'])->where('status', 'active')->limit(1);
        }, 'placementAsIntern.mentor:id,name'])->whereHas("placementAsIntern", function ($query) use ($program) {
            return $query->where('program_id', $program->id);
        })->get();

        return Inertia::render("Program/ProgramShow", compact("program", "mentors", "interns"));
    }
}
