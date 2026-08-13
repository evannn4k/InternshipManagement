<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TaskPolicy
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function read()
    {
        return $this->user->hasPermission("task:read");
    }

    public function create()
    {
        return $this->user->hasPermission("task:create");
    }

    public function update()
    {
        return $this->user->hasPermission("task:update");
    }

    public function delete()
    {
        return $this->user->hasPermission("task:delete");
    }
}
