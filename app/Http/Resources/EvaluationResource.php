<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EvaluationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $avg = number_format(($this->reliability_score +
            $this->learning_score +
            $this->code_quality_score +
            $this->problem_solving_score +
            $this->collaboration_score +
            $this->communication_score +
            $this->documentation_score) / 7, 2);

        return array_merge($this->resource->toArray(), [
            'average_score' => $avg,
        ]);
    }
}
