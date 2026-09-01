<?php

namespace App\Http\Controllers\Evaluation;

use App\Http\Controllers\Controller;
use App\Http\Requests\Evaluation\UpdateEvaluationRequest;
use App\Models\Evaluation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class UpdateEvaluationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateEvaluationRequest $request, Evaluation $evaluation)
    {
        Gate::authorize('evaluation:update');
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

            $evaluation->update($credentials);

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Berhasil mengubah data evaluasi.',
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
