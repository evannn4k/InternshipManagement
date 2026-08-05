<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DeleteSchoolController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(School $school)
    {
        try {
            $school->delete();

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil menghapus data sekolah.",
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
