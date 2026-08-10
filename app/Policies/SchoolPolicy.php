<?php

namespace App\Policies;

use App\Models\School;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Auth;

class SchoolPolicy
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function read()
    {
        return $this->user->hasPermission("school:read");
    }

    public function create()
    {
        return $this->user->hasPermission("school:create");
    }

    public function update()
    {
        return $this->user->hasPermission("school:update");
    }

    public function delete()
    {
        return $this->user->hasPermission("school:delete");
    }
}
