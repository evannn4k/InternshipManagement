<?php

namespace App\Http\Controllers;

use App\Http\Requests\DownloadFileRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class DownloadFileController extends Controller
{
    public function __invoke(Request $request)
    {
        Gate::authorize('document:delete');

        try {
            $path = $request->query('path');
            $path = storage_path('app/public/' . $path);

            if (!file_exists($path)) {
                abort(404);
            }

            return response()->download($path);
        } catch (\Exception $e) {
            Log::error('Error : ' . $e->getMessage());

            return redirect()
                ->back()
                ->with(
                    'error',
                    'terjadi kesalahan sistem. Silahkan coba lagi.',
                );
        }
    }
}
