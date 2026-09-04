<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Guarded;

#[Guarded([])]
class Attendance extends Model
{
    public function scopeHasRole($query, User $user)
    {
        if ($user->role->name === 'intern') {
            $placement = $user->placementAsIntern()->get()->pluck('id');

            return $query->whereIn('placement_id', $placement->all());
        } else if ($user->role->name === 'mentor') {
            $placement = $user->placementAsMentor()->get()->pluck('id');

            return $query->whereIn('placement_id', $placement->all());
        }

        return $query;
    }

    public function placement()
    {
        return $this->belongsTo(Placement::class, 'placement_id');
    }

    public function correctedBy()
    {
        return $this->belongsTo(User::class, 'corrected_by');
    }
}
