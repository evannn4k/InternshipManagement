<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\RevisionTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class RevisionTaskController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(RevisionTaskRequest $request, Task $task)
    {
        Gate::authorize("task:review");
        $credentials = $request->validated();

        try {
            if ($task->status !== "submitted") {
                return redirect()
                    ->back()
                    ->with(
                        "error",
                        "Tugas tidak valid.",
                    );
            }

            $credentials['status'] = "revision_requested";
            $credentials['reviewed_at'] = now();
            
            $task->update($credentials);

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil meminta revisi tugas.",
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
