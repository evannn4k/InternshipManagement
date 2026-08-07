<?php

namespace App\Providers;

use App\Models\User;
use App\Policies\SchoolPolicy;
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
        Gate::define('school:read', [SchoolPolicy::class, "read"]);
        Gate::define('school:create', [SchoolPolicy::class, "create"]);
        Gate::define('school:update', [SchoolPolicy::class, "update"]);
        Gate::define('school:delete', [SchoolPolicy::class, "delete"]);
        
        Gate::define('role:manage', function() {
            return Auth::user()->hasPermission("role:manage");
        });
    }
}
