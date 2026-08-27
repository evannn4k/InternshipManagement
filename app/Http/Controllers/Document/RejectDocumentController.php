<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class RejectDocumentController extends Controller
{
    public function __invoke(Document $document)
    {
        Gate::authorize('document:review');
        $credentials = $request->validated();

        try {
            if ($document->status !== 'submitted') {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Tugas tidak valid.',
                    );
            }

            $credentials['reviewed_at'] = now();

            $document->update($credentials);

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Berhasil meminta menolak dokumen.',
                );
        } catch (\Exception $e) {
            Log::error('Error : '.$e->getMessage());

            return redirect()
                ->back()
                ->with(
                    'error',
                    'terjadi kesalahan sistem. Silahkan coba lagi.',
                );
        }
    }
}
