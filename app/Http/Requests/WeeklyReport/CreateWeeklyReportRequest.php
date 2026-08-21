<?php

namespace App\Http\Requests\WeeklyReport;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateWeeklyReportRequest extends FormRequest
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
            'completed_work' => 'required|string',
            'challenges' => 'nullable|string',
            'solutions' => 'nullable|string',
            'lessons_learned' => 'required|string',
            'next_week_plan' => 'required|string',
            'support_needed' => 'nullable|string',
        ];
    }
}
