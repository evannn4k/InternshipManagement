<?php

namespace App\Http\Controllers\Evaluation;

use App\Http\Controllers\Controller;
use App\Http\Requests\Evaluation\CreateEvaluationRequest;
use App\Models\Activity;
use App\Models\Evaluation;
use App\Models\Placement;
use App\Notifications\FcmNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class CreateEvaluationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CreateEvaluationRequest $request)
    {
        Gate::authorize('evaluation:create');
        $credentials = $request->validated();

        try {
            $user = Auth::user();

            if ($user->role->name === 'mentor' && ! in_array($credentials['placement_id'], $user->placementAsMentor->where('status', 'active')->pluck('id')->all())) {
                return redirect()
                    ->back()
                    ->with(
                        'error',
                        'Penempatan tidak valid.',
                    );
            }

            $credentials['evaluator_id'] = $user->id;

            $evaluation = Evaluation::create($credentials);

            $activity = [
                "user_id" => Auth::user()->id,
                "action" => "Evaluation published",
                "subject" => "evaluation",
                "subject_id" => $evaluation->id,
                "old_value" => "-",
                "new_value" => "-",
                "ip_address" =>  $request->ip()
            ];

            Activity::create($activity);

            if ($credentials['is_visible_to_intern'] == 1) {
                $intern = Placement::find($credentials['placement_id'])->intern;

                if ($intern->fcm_token) {
                    $intern->notify(new FcmNotification(title: "Mendapat Evaluasi Baru", body: $credentials['evaluation_type'] ?? ""));
                }
            }

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Berhasil menambah data evaluasi.',
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
