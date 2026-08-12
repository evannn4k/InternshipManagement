<?php

namespace App\Http\Controllers\Placement;

use App\Http\Controllers\Controller;
use App\Models\Placement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\Placement\TerminatePlacementRequest;

class TerminatePlacementController extends Controller
{
    public function __invoke(TerminatePlacementRequest $request, Placement $placement)
    {
        Gate::authorize("placement:update");
        $credentials = $request->validated();

        try {
            $credentials['status'] = 'terminated';
            $placement->update($credentials);

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil menambah mengakhiri masa penempatan.",
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
