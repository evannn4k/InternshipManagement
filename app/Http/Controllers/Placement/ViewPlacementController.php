<?php

namespace App\Http\Controllers\Placement;

use App\Models\Placement;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\User;
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

        return Inertia::render("Placement/PlacementShow", compact("placement"));
    }
}
