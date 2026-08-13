<?php

namespace App\Http\Requests\User;

use App\Models\Role;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Validator;

class CreateUserRequest extends FormRequest
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
            "school_id" => "nullable|integer|exists:schools,id",
            "phone" => "nullable|max:15",
            "email" => "required|email|max:255|unique:users,email",
            "role_id" => "required|integer|exists:roles,id",
            "password" => "required|string|max:255|min:8|confirmed",
            "is_active" => "required|boolean",
            "avatar" => "nullable|image|mimes:jpg,jpeg,png,gif,svg,webp,jfif|max:2048",
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator) {
                if ($validator->errors()->any()) {
                    return;
                }
                if ($this->role_id == 3 && $this->school_id == null) {
                    $validator->errors()->add('role_id', 'Role intern wajib memasukan sekolahan.');
                }
            },
        ];
    }
}
