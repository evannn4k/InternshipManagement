<?php

namespace App\Models;

use App\Models\Placement;
use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Model;

#[Guarded([])]
class Evaluation extends Model
{
    public function scopeHasRole($query, User $user)
    {
        if ($user->role->name === 'intern') {
            $placement = $user->placementAsIntern()->get()->pluck('id');

            return $query->whereIn('placement_id', $placement->all());
        } elseif ($user->role->name === 'mentor') {
            $placement = $user->placementAsMentor()->get()->pluck('id');

            return $query->whereIn('placement_id', $placement->all());
        }

        return $query;
    }

    public function placement()
    {
        return $this->belongsTo(Placement::class, "placement_id");
    }

    public function evaluator()
    {
        return $this->belongsTo(User::class, "evaluator_id");
    }
}
