<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ViewRoleController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize("role:manage");
        
        $roles = Role::with('permissions')->get();

        $permissions = Permission::all()->groupBy(function ($query) {
            return explode(":", $query->name)[0];
        });

        return Inertia::render("Role/RoleIndex", compact("roles", "permissions"));
    }
}
