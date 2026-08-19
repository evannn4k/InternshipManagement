<?php

namespace App\Http\Requests\Attendance;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Validator;

class UpdateAttendanceRequest extends FormRequest
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
            "attendance_date" => "required|date",
            "status" => "required|in:present,late,absent,sick,permitted",
            "check_in_at" => "nullable|date",
            "check_out_at" => "nullable|date",
            "mentor_notes" => "nullable|string",
            "correction_reason" => "nullable|string",
        ];
    }

    public function after() {
        return [
            function(Validator $validator) {
                if ($validator->errors()->any()) {
                    return;
                }

                if ($this->status === 'late' && !$this->check_in_at) {
                    $validator->errors()->add('check_in_at', 'Check in harus diisi untuk status late.');
                }
            }
        ];
    }
}
