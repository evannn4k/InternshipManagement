<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\CompletedTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class CompletedTaskController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CompletedTaskRequest $request, Task $task)
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

            $credentials['status'] = "completed";
            $credentials['reviewed_by'] = Auth::user()->id;
            $credentials['reviewed_at'] = now();
            $credentials['completed_at'] = now();
            
            $task->update($credentials);

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil menyelesaikan tugas.",
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
