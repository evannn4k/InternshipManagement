<?php

namespace App\Http\Controllers\Program;

use App\Http\Controllers\Controller;
use App\Http\Requests\Program\CreateProgramRequest;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class CreateProgramController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CreateProgramRequest $request)
    {
        Gate::authorize("program:create");
        $credentials = $request->validated();

        try {
            $credentials['created_by'] = Auth::user()->id;
            Program::create($credentials);

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil menambah data program.",
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
