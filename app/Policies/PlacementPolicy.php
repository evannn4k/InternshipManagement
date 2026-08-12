<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class PlacementPolicy
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function read()
    {
        return $this->user->hasPermission("placement:read");
    }

    public function create()
    {
        return $this->user->hasPermission("placement:create");
    }

    public function update()
    {
        return $this->user->hasPermission("placement:update");
    }

    public function delete()
    {
        return $this->user->hasPermission("placement:delete");
    }
}
