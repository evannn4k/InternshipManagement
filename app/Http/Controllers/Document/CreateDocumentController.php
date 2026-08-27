<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use App\Http\Requests\Document\CreateDocumentRequest;
use App\Models\Document;
use App\Services\DocumentService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class CreateDocumentController extends Controller
{
    public function __invoke(CreateDocumentRequest $request)
    {
        Gate::authorize('document:create');
        $credentials = $request->validated();

        try {
            $user = Auth::user();
            if ($user->role->name === 'intern') {
                $credentials['placement_id'] = $user->placementAsIntern->where('status', 'active')->first()->id;
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

            $pathname = DocumentService::save($file);
            $credentials['file_path'] = 'document/'.$pathname;
            $credentials['mime_type'] = $file->getClientMimeType();
            $credentials['original_filename'] = $file->getClientOriginalName();
            $credentials['file_size'] = $file->getSize();
            $credentials['uploaded_by'] = Auth::user()->id;
            unset($credentials['file']);

            Document::create($credentials);

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Berhasil menambah dokumen.',
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
