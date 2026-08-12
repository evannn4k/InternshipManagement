<?php

namespace App\Http\Controllers\Placement;

use App\Models\Placement;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ViewPlacementController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('placement:read');

        $search = $request->input("search");
        $filter = $request->input("filter");

        $data = Placement::with("intern", "mentor", "program")->when($search, function ($query, $search) {
            return $query->where('name', 'like',  "%$search%");
        })->when($filter, function ($query, $filter) {
            $status = $filter == "aktif" ? 1 : ($filter == "tidak-aktif" ? 0 : 2);
            return $query->where('is_active', "$status");
        })->paginate(10)->withQueryString();

        $users = User::with('role')->get();
        $programs = Program::where("status", "active")->get();

        return Inertia::render("Placement/PlacementIndex", compact("data", "users", "programs"));
    }

    public function show(Placement $placement)
    {
        Gate::authorize('placement:read');

        return Inertia::render("Placement/PlacementShow", compact("placement"));
    }
}
