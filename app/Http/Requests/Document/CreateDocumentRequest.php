<?php

namespace App\Http\Requests\Document;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Validator;

class CreateDocumentRequest extends FormRequest
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
            'placement_id' => 'nullable|integer|exists:placements,id',
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'file' => 'required|file|max:5120|mimes:pdf,jepg,jpg,png,webp,jfif,docx',
            'description' => 'nullable|max:5120',
        ];
    }

    public function after()
    {
        return [
            function (Validator $validator) {
                if (Auth::user()->role->name === "intern") {
                    return;
                }
                if (!$this->placement_id) {
                    $validator->errors()->add('placement_id', 'Penempatan wajib diisi.');
                }
            },
        ];
    }
}
