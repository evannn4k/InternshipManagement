<?php

namespace App\Http\Requests\Program;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateProgramRequest extends FormRequest
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
            "name" => "required|string|max:255",
            "description" => "nullable|string",
            "working_days" => "required|array",
            "working_days.*" => "string",
            "start_date" => "required|date",
            "end_date" => "required|date|after_or_equal:start_date",
            "work_start_time" => "required|date_format:H:i",
            "work_end_time" => "required|date_format:H:i|after_or_equal:work_start_time",
            "late_tolerance_minutes" => "required|integer|gte:0",
            "status" => "required|string|in:active,inactive,draft,archived",
        ];
    }
}
