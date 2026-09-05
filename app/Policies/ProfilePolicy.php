<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Support\Facades\Auth as FacadesAuth;

class ProfilePolicy
{
    protected $user;

    public function __construct()
    {
        $this->user = FacadesAuth::user();
    }

    public function read()
    {
        return $this->user->hasPermission("profile:read");
    }

    public function update()
    {
        return $this->user->hasPermission("profile:update");
    }
}
