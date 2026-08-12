<?php

namespace App\Http\Requests\Placement;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Validator;

class UpdatePlacementRequest extends FormRequest
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
            "mentor_id" => "required|integer|exists:users,id",
            "position_title" => "nullable|string|max:255",
            "objective" => "nullable|string",
            "start_date" => "required|date",
            "end_date" => "required|date|after:start_date",
            "status" => "required|string|max:255|in:planned,active",
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator) {
                if ($validator->errors()->any()) {
                    return;
                }

                $mentor = User::with('role')->where('id', $this->mentor_id)->first();
                if ($mentor->role->name !== 'mentor') {
                    $validator->errors()->add('mentor_id', 'Mentor harus memiliki peran mentor.');
                }
            },
        ];
    }
}
