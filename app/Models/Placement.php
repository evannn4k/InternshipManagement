<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Model;

#[Guarded([])]
class Placement extends Model
{
    public function scopeHasRole($query, User $user)
    {
        if ($user->role->name === 'intern') {
            return $query->where('intern_id', $user->id)->where("status", "active");
        } elseif ($user->role->name === 'mentor') {
            return $query->where('mentor_id', $user->id)->where("status", "active");
        }

        return $query;
    }

    public function program()
    {
        return $this->belongsTo(Program::class, 'program_id');
    }

    public function intern()
    {
        return $this->belongsTo(User::class, 'intern_id');
    }

    public function mentor()
    {
        return $this->belongsTo(User::class, 'mentor_id');
    }

    public function attendance()
    {
        return $this->hasMany(Attendance::class, 'placement_id');
    }

    public function getEffectiveWorkingDays()
    {
        return 'test';
    }

    public function weeklyReport()
    {
        return $this->hasMany(WeeklyReport::class);
    }

    public function document()
    {
        return $this->hasMany(Document::class);
    }

    public function evaluation()
    {
        return $this->hasMany(Evaluation::class);
    }
}
