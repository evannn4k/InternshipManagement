<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use App\Http\Requests\Document\UpdateDocumentRequest;
use App\Models\Document;
use App\Services\DocumentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class UpdateDocumentController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateDocumentRequest $request, Document $document)
    {
        Gate::authorize('document:update');
        $credentials = $request->validated();

        try {
            $user = Auth::user();

            if ($document->status !== "pending") {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Dokumen sudah tidak dapat diubah.',
                    );
            }

            if ($user->role->name === 'mentor' && ! in_array($credentials['placement_id'], $user->placementAsMentor->where('status', 'active')->pluck('id')->all())) {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Penempatan tidak valid.',
                    );
            }

            $file = $request->file('file');

            if (isset($file)) {
                $pathname = DocumentService::save($file, $document->file_path);
                $credentials['file_path'] = 'document/' . $pathname;
                $credentials['mime_type'] = $file->getClientMimeType();
                $credentials['original_filename'] = $file->getClientOriginalName();
                $credentials['file_size'] = $file->getSize();
                $credentials['uploaded_by'] = Auth::user()->id;
            }

            unset($credentials['file']);

            $document->update($credentials);

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Berhasil mengubah dokumen.',
                );
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
