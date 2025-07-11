<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "name" => ['required', 'string', 'max:255'],
            "image" => ['nullable', 'image', 'mimes:jpg,jpeg,png,gif'],
            "description" => ['string'],
            "due_date" => ["nullable", "date"],
            "status" => ['required', Rule::in(['pending', 'in_progress', 'completed'])],
        ];
    }
}
