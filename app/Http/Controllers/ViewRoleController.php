<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ViewRoleController extends Controller
{
    public function index(Request $request)
    {
        $roles = Role::with('permissions')->get();
        
        $permissions = Permission::all()->groupBy(function($query) {
            return explode(":", $query->name)[0];
        });
        
        return Inertia::render("Role/RoleIndex", compact("roles", "permissions"));
    }
}
