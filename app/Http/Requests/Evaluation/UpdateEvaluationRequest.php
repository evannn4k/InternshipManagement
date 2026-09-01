<?php

namespace App\Http\Requests\Evaluation;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateEvaluationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'evaluation_type' => 'required|string|max:255',
            'period_start_date' => 'required|date',
            'period_end_date' => 'required|date|after_or_equal:period_start_date',
            'strengths' => 'required|string',
            'improvement_areas' => 'required|string',
            'action_plan' => 'nullable|string',
            'overall_comment' => 'required|string',
            'reliability_score' => 'required|integer|min:1|max:4',
            'learning_score' => 'required|integer|min:1|max:4',
            'code_quality_score' => 'required|integer|min:1|max:4',
            'problem_solving_score' => 'required|integer|min:1|max:4',
            'collaboration_score' => 'required|integer|min:1|max:4',
            'communication_score' => 'required|integer|min:1|max:4',
            'documentation_score' => 'required|integer|min:1|max:4',
            'is_visible_to_intern' => 'required|boolean',
        ];
    }
}
