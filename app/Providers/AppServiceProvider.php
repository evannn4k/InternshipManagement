<?php

namespace App\Providers;

use App\Policies\AttendancePolicy;
use App\Policies\DocumentPolicy;
use App\Policies\EvaluationPolicy;
use App\Policies\PlacementPolicy;
use App\Policies\ProgramPolicy;
use App\Policies\SchoolPolicy;
use App\Policies\TaskPolicy;
use App\Policies\UserPolicy;
use App\Policies\WeeklyReportPolicy;
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
        Gate::define('task:change-status', [TaskPolicy::class, "changeStatus"]);
        Gate::define('task:submit', [TaskPolicy::class, "submit"]);
        Gate::define('task:review', [TaskPolicy::class, "review"]);
        
        Gate::define('attendance:read', [AttendancePolicy::class, "read"]);
        Gate::define('attendance:create', [AttendancePolicy::class, "create"]);
        Gate::define('attendance:update', [AttendancePolicy::class, "update"]);
        Gate::define('attendance:delete', [AttendancePolicy::class, "delete"]);
        Gate::define('attendance:check-in', [AttendancePolicy::class, "checkIn"]);
        Gate::define('attendance:check-out', [AttendancePolicy::class, "checkOut"]);
        
        Gate::define('weekly-report:read', [WeeklyReportPolicy::class, "read"]);
        Gate::define('weekly-report:create', [WeeklyReportPolicy::class, "create"]);
        Gate::define('weekly-report:update', [WeeklyReportPolicy::class, "update"]);
        Gate::define('weekly-report:delete', [WeeklyReportPolicy::class, "delete"]);
        Gate::define('weekly-report:review', [WeeklyReportPolicy::class, "review"]);
        
        Gate::define('document:read', [DocumentPolicy::class, "read"]);
        Gate::define('document:create', [DocumentPolicy::class, "create"]);
        Gate::define('document:update', [DocumentPolicy::class, "update"]);
        Gate::define('document:delete', [DocumentPolicy::class, "delete"]);
        Gate::define('document:review', [DocumentPolicy::class, "review"]);

        Gate::define('evaluation:read', [EvaluationPolicy::class, "read"]);
        Gate::define('evaluation:create', [EvaluationPolicy::class, "create"]);
        Gate::define('evaluation:update', [EvaluationPolicy::class, "update"]);
        Gate::define('evaluation:delete', [EvaluationPolicy::class, "delete"]);
    }
}
