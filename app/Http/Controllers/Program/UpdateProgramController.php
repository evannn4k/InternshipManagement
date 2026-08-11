<?php

namespace App\Http\Controllers\Program;

use App\Http\Controllers\Controller;
use App\Http\Requests\Program\UpdateProgramRequest;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class UpdateProgramController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateProgramRequest $request, Program $program)
    {
        Gate::authorize("program:update");
        $credentials = $request->validated();

        try {
            $program->update($credentials);

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil mengubah data program.",
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
