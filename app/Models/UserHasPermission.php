<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserHasPermission extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function permission()
    {
        return $this->belongsToMany(Permission::class);
    }
}
