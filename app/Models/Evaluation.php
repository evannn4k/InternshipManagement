<?php

namespace App\Models;

use App\Models\Placement;
use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Model;

#[Guarded([])]
class Evaluation extends Model
{
    protected $appends = ['average_score'];

    public function scopeHasRole($query, User $user)
    {
        if ($user->role->name === 'intern') {
            $placement = $user->placementAsIntern()->get()->pluck('id');

            return $query->where('is_visible_to_intern', true)->whereIn('placement_id', $placement->all());
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

    public function getAverageScoreAttribute()
    {
        return number_format((
            $this->reliability_score +
            $this->learning_score +
            $this->code_quality_score +
            $this->problem_solving_score +
            $this->collaboration_score +
            $this->communication_score +
            $this->documentation_score
        ) / 7, 2);
    }
}
