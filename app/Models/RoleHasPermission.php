<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleHasPermission extends Model
{
    public function role() {
        return $this->belongsToMany(Role::class);
    }
    
    public function permission() {
        return $this->belongsToMany(Permission::class);
    }
}
