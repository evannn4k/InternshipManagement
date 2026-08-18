<?php

namespace App\Policies;

use Illuminate\Support\Facades\Auth;

class AttendancePolicy
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function read()
    {
        return $this->user->hasPermission("attendance:read");
    }

    public function create()
    {
        return $this->user->hasPermission("attendance:create");
    }

    public function checkIn()
    {
        return $this->user->hasPermission("attendance:check-in");
    }

    public function checkOut()
    {
        return $this->user->hasPermission("attendance:check-out");
    }
}
