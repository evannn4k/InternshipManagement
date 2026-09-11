<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use App\Http\Requests\Document\RejectDocumentRequest;
use App\Models\Activity;
use App\Models\Document;
use App\Notifications\FcmNotification;
use App\Services\DocumentService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class RejectDocumentController extends Controller
{
    public function __invoke(RejectDocumentRequest $request, Document $document)
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
            $credentials['status'] = "rejected";

            $document->update($credentials);

            DocumentService::destroy($document->file_path);

            $activity = [
                "user_id" => Auth::user()->id,
                "action" => "Document rejected",
                "subject" => "documenet",
                "subject_id" => null,
                "old_value" => "pending",
                "new_value" => "rejected",
                "ip_address" =>  $request->ip()
            ];

            Activity::create($activity);

            $intern = $document->placement->intern;

            if ($intern->fcm_token) {
                $intern->notify(new FcmNotification(title: "Dokumen ditolak", body: $credentials['review_notes'] ?? ""));
            }

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Berhasil meminta menolak dokumen.',
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
