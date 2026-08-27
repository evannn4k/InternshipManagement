<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Model;

#[Guarded([])]
class Document extends Model
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
}
