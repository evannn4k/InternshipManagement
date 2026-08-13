<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Model;

#[Guarded([''])]
class Task extends Model
{
    public function scopeHasRole($query, User $user)
    {
        if ($user->role->name === 'intern') {
            $placement = $user->placementAsIntern()->get()->pluck('id');
            return $query->where('placement_id', $placement->all());
        } else if ($user->role->name === 'mentor') {
            $placement = $user->placementAsMentor()->get()->pluck('id');
            return $query->where('placement_id', $placement->all());
        }

        return $query;
    }

    public function placement()
    {
        return $this->belongsTo(Placement::class);
    }

    public function reviewedBy()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
