<?php

namespace App\Http\Requests\User;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Validator;

class ResetPasswordUserRequest extends FormRequest
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
            "old_password" => "required|string|min:8|max:255",
            "password" => "required|string|confirmed|min:8|max:255",
        ];
    }

    public function after() {
        return [
            function(Validator $validator) {              
                $user = User::findOrFail($this->route('user')->id);

                if(!Hash::check($this->old_password, $user->password)) {
                    $validator->errors()->add('old_password', 'Old password is incorrect..');
                }
            }
        ];
    }
}
