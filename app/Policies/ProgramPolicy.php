<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ProgramPolicy
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function read()
    {
        return $this->user->hasPermission("program:read");
    }

    public function create()
    {
        return $this->user->hasPermission("program:create");
    }

    public function update()
    {
        return $this->user->hasPermission("program:update");
    }

    public function delete()
    {
        return $this->user->hasPermission("program:delete");
    }
}
