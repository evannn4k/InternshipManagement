<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Model;

#[Guarded([])]
class School extends Model
{
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
