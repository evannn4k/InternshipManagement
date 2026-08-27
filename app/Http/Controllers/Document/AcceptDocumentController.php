<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use App\Http\Requests\Document\AcceptDocumentRequest;
use App\Models\Document;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class AcceptDocumentController extends Controller
{
    public function __invoke(AcceptDocumentRequest $request, Document $document)
    {
        Gate::authorize('document:review');
        $credentials = $request->validated();

        try {
            if ($document->status !== 'pending') {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Dokumen tidak valid.',
                    );
            }

            $credentials['reviewed_by'] = Auth::user()->id;
            $credentials['reviewed_at'] = now();
            $credentials['status'] = 'accepted';

            $document->update($credentials);

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Berhasil menerima dokumen.',
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
