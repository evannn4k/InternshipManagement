<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Model;

#[Guarded([])]
class WeeklyReport extends Model
{
    public function scopeHasRole($query, User $user)
    {
        if ($user->role->name === 'intern') {
            $placement = $user->placementAsIntern()->get()->pluck('id');

            return $query->where('placement_id', $placement->all());
        } elseif ($user->role->name === 'mentor') {
            $placement = $user->placementAsMentor()->get()->pluck('id');

            return $query->where('placement_id', $placement->all());
        }

        return $query;
    }

    public function placementId()
    {
        return $this->belongsTo(Placement::class, 'placement_id');
    }

    public function reviewedBy()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
