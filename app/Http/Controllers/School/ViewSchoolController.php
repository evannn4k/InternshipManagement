<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ViewSchoolController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('school:read');

        $search = $request->input("search");
        $filter = $request->input("filter");

        $data = School::when($search, function ($query, $search) {
            return $query->where('name', 'like',  "%$search%");
        })->when($filter, function ($query, $filter) {
            $status = $filter == "aktif" ? 1 : ($filter == "tidak-aktif" ? 0 : 2);
            return $query->where('is_active', "$status");
        })->paginate(10)->withQueryString();

        return Inertia::render("School/SchoolIndex", compact("data"));
    }

    public function show(School $school)
    {
        Gate::authorize('school:read');

        return Inertia::render("School/SchoolShow", compact("school"));
    }
}
