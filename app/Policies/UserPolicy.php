<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserPolicy
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function read()
    {
        return $this->user->hasPermission("user:read");
    }
    
    public function update()
    {
        return $this->user->hasPermission("user:update");
    }

    public function delete()
    {
        return $this->user->hasPermission("user:delete");
    }
}
