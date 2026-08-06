<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use App\Http\Requests\School\CreateSchoolRequest;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class CreateSchoolController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CreateSchoolRequest $request)
    {
        Gate::authorize("school:create");
        $credentials = $request->validated();
        
        try {
            School::create($credentials);
            
            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil menambah data sekolah.",
                );
        } catch (\Exception $e) {
            Log::error("Error : " . $e->getMessage());

            return redirect()
                ->back()
                ->with(
                    "error",
                    "terjadi kesalahan sistem. Silahkan coba lagi.",
                );
        }
    }
}
