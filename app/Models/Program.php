<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Guarded;

#[Guarded([])]
class Program extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class, "created_by");
    }

    protected function casts(): array
    {
        return [
            'working_days' => 'array',
            'work_start_time' => 'datetime:H:i',
            'work_end_time' => 'datetime:H:i',

        ];
    }
}
