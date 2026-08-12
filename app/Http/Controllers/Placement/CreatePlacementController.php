<?php

namespace App\Http\Controllers\Placement;

use App\Http\Requests\Placement\CreatePlacementRequest;
use App\Http\Controllers\Controller;
use App\Models\Placement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class CreatePlacementController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CreatePlacementRequest $request)
    {
        Gate::authorize("placement:create");
        $credentials = $request->validated();

        try {
            Placement::create($credentials);

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
