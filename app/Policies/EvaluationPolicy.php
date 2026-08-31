<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class EvaluationPolicy
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function read()
    {
        return $this->user->hasPermission("evaluation:read");
    }

    public function create()
    {
        return $this->user->hasPermission("evaluation:create");
    }

    public function update()
    {
        return $this->user->hasPermission("evaluation:update");
    }

    public function delete()
    {
        return $this->user->hasPermission("evaluation:delete");
    }
}
