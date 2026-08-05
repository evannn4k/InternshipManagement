<?php

namespace App\Http\Requests\School;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateSchoolRequest extends FormRequest
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
            "npsn" => "nullable|integer",
            "address" => "nullable|string",
            "city" => "nullable|string",
            "province" => "nullable|string",
            "contact_person_name" => "nullable|string",
            "contact_person_phone" => "nullable",
            "contact_person_email" => "nullable|email",
            "notes" => "nullable|string",
            "is_active" => "nullable|boolean",
        ];
    }
}
