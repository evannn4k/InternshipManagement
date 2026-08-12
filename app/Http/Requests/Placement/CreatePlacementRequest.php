<?php

namespace App\Http\Requests\Placement;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Validator;

class CreatePlacementRequest extends FormRequest
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
            "program_id" => "required|integer|exists:programs,id",
            "intern_id" => "required|integer|exists:users,id",
            "mentor_id" => "required|integer|exists:users,id",
            "position_title" => "nullable|string|max:255",
            "objective" => "nullable|string",
            "termination_reason" => "nullable|string",
            "start_date" => "required|date",
            "end_date" => "required|date|after:start_date",
            "status" => "required|string|max:255",
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator) {
                if($validator->errors()->any()) {
                    return;
                }
                
                $intern = User::with('role', 'placementAsIntern')->where('id', $this->intern_id)->first();
                if ($intern->role->name !== 'intern') {
                    $validator->errors()->add('intern_id', 'Peserta magang harus memiliki peran intern.');
                }

                $mentor = User::with('role')->where('id', $this->mentor_id)->first();
                if ($mentor->role->name !== 'mentor') {
                    $validator->errors()->add('mentor_id', 'Mentor harus memiliki peran mentor.');
                }


                if ($intern->placementAsIntern->count() > 0 && $this->status == 'active') {
                    $internPlacements = $intern->placementAsIntern;
                    foreach ($internPlacements as $placement) {
                        if ($placement->status === 'active') {
                            $validator->errors()->add('intern_id', 'Peserta magang tidak memiliki lebih dari 1 penempatan aktif.');
                        }
                    }
                }
            },
        ];
    }
}
