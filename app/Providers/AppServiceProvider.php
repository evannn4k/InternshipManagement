<?php

namespace App\Providers;

use App\Policies\PlacementPolicy;
use App\Policies\ProgramPolicy;
use App\Policies\SchoolPolicy;
use App\Policies\TaskPolicy;
use App\Policies\UserPolicy;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {   
        Gate::define('role:manage', function () {
            return Auth::user()->hasPermission("role:manage");
        });

        Gate::define('school:read', [SchoolPolicy::class, "read"]);
        Gate::define('school:create', [SchoolPolicy::class, "create"]);
        Gate::define('school:update', [SchoolPolicy::class, "update"]);
        Gate::define('school:delete', [SchoolPolicy::class, "delete"]);

        Gate::define('user:read', [UserPolicy::class, "read"]);
        Gate::define('user:create', [UserPolicy::class, "create"]);
        Gate::define('user:update', [UserPolicy::class, "update"]);
        Gate::define('user:delete', [UserPolicy::class, "delete"]);

        Gate::define('program:read', [ProgramPolicy::class, "read"]);
        Gate::define('program:create', [ProgramPolicy::class, "create"]);
        Gate::define('program:update', [ProgramPolicy::class, "update"]);
        Gate::define('program:delete', [ProgramPolicy::class, "delete"]);
        
        Gate::define('placement:read', [PlacementPolicy::class, "read"]);
        Gate::define('placement:create', [PlacementPolicy::class, "create"]);
        Gate::define('placement:update', [PlacementPolicy::class, "update"]);
        Gate::define('placement:delete', [PlacementPolicy::class, "delete"]);

        Gate::define('task:read', [TaskPolicy::class, "read"]);
        Gate::define('task:create', [TaskPolicy::class, "create"]);
        Gate::define('task:update', [TaskPolicy::class, "update"]);
        Gate::define('task:delete', [TaskPolicy::class, "delete"]);
    }
}
