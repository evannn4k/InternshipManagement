<?php

namespace App\Http\Controllers\Program;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class DeleteProgramController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Program $program)
    {
        Gate::authorize("program:delete");

        try {
            $program->delete();

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil menghapus data program.",
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
