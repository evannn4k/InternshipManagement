<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\School;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ViewUserController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('user:read');

        $search = $request->input("search");
        $filter = $request->input("filter");

        $data = User::with('role')->when($search, function ($query, $search) {
            return $query->where('name', 'like',  "%$search%");
        })->when($filter, function ($query, $filter) {
            $status = $filter == "aktif" ? 1 : ($filter == "tidak-aktif" ? 0 : 2);
            return $query->where('is_active', "$status");
        })->paginate(10)->withQueryString();

        $roles = Role::all();
        $schools = School::query()->where("is_active", true)->get();

        return Inertia::render("User/UserIndex", compact("data", "roles", "schools"));
    }

    public function show(User $user)
    {
        Gate::authorize('user:read');
        $roles = Role::all();

        return Inertia::render("User/UserShow", compact("user", "roles"));
    }
}
