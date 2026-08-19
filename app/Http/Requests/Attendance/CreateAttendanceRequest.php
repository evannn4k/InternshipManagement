<?php

namespace App\Http\Requests\Attendance;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateAttendanceRequest extends FormRequest
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
            "placement_id" => "required|exists:placements,placement_id",
            "attendance_date" => "required|date",
            "attendance_status" => "required|in:present,absent",
            "check_in_at" => "nullable|time",
            "check_out_at" => "nullable|time",
            "mentor_note" => "nullable|string",
            "corrector_reason" => "nullable|string",
        ];
    }
}
