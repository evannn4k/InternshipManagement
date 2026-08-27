<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DocumentPolicy
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function read()
    {
        return $this->user->hasPermission("document:read");
    }

    public function create()
    {
        return $this->user->hasPermission("document:create");
    }

    public function update()
    {
        return $this->user->hasPermission("document:update");
    }

    public function delete()
    {
        return $this->user->hasPermission("document:delete");
    }
    
    public function review()
    {
        return $this->user->hasPermission("document:review");
    }
}
