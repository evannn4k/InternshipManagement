<?php

namespace App\Http\Requests\Task;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateTaskRequest extends FormRequest
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
            "title" => "required|string|max:255",
            "priority" => "required|string|in:low,medium,high,urgent",
            "start_date" => "nullable|date",
            "due_date" => "nullable|date|after_or_equal:start_date",
            "estimated_hours" => "nullable|numeric|min:0",
            "description" => "required|string",
            "acceptance_criteria" => "required|string",
        ];
    }
}
