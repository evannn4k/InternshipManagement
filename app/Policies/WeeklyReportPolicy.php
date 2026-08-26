<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class WeeklyReportPolicy
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function read()
    {
        return $this->user->hasPermission("weekly-report:read");
    }

    public function create()
    {
        return $this->user->hasPermission("weekly-report:create");
    }

    public function update()
    {
        return $this->user->hasPermission("weekly-report:update");
    }

    public function delete()
    {
        return $this->user->hasPermission("weekly-report:delete");
    }
    
    public function review()
    {
        return $this->user->hasPermission("weekly-report:review");
    }
}
