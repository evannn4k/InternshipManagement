<?php

namespace App\Http\Controllers\Evaluation;

use App\Http\Controllers\Controller;
use App\Models\Evaluation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class DeleteEvaluationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Evaluation $evaluation)
    {
        Gate::authorize("evaluation:delete");

        try {
            $evaluation->delete();

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil menghapus data evaluasi.",
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
