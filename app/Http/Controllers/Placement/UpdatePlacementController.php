<?php

namespace App\Http\Controllers\Placement;

use App\Http\Controllers\Controller;
use App\Http\Requests\Placement\UpdatePlacementRequest;
use App\Models\Placement;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class UpdatePlacementController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdatePlacementRequest $request, Placement $placement)
    {
        Gate::authorize("placement:update");
        $credentials = $request->validated();

        try {
            if ($placement->status == "terminate" || $placement->status == "completed") {
                return redirect()
                    ->back()
                    ->with(
                        "error",
                        "Penempatan tidak valid.",
                    );
            }

            $intern = User::with('placementAsIntern')->where('id', $placement->intern_id)->first();
            if ($intern->placementAsIntern->count() > 0 && $credentials["status"] == 'active') {
                foreach ($intern->placementAsIntern as $placement) {
                    if ($placement->status === 'active') {
                        return redirect()
                            ->back()
                            ->with(
                                "error",
                                "Gagal, peserta magang memiliki penempatan aktif.",
                            );
                    }
                }
            }

            $placement->update($credentials);

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil menambah mengubah data penempatan.",
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
