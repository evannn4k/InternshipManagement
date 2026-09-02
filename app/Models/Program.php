<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Guarded;

#[Guarded([])]
class Program extends Model
{
    public function createdBy()
    {
        return $this->belongsTo(User::class, "created_by");
    }

    public function placements()
    {
        return $this->hasMany(Placement::class, 'program_id');
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
