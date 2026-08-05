<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    public function roleHasPermission()
    {
        return $this->hasMany(RoleHasPermission::class);
    }

    public function userHasPermission()
    {
        return $this->hasMany(UserHasPermission::class);
    }
}
