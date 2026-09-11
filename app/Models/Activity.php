<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Model;

#[Guarded([''])]
class Activity extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }
}
