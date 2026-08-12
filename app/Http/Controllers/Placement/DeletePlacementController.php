<?php

namespace App\Http\Controllers\Placement;

use App\Http\Controllers\Controller;
use App\Models\Placement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class DeletePlacementController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Placement $placement)
    {
        Gate::authorize("placement:delete");

        try {
            $placement->delete();

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil menghapus data penempatan.",
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
