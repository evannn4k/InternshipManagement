<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\SubmitTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class SubmitTaskController extends Controller
{
    public function __invoke(SubmitTaskRequest $request, Task $task)
    {
        Gate::authorize("task:submit");
        $credentials = $request->validated();

        try {
            if($task->status !== "in_progress" && $task->status !== "revision_requested") {
                return redirect()
                    ->back()
                    ->with(
                        "error",
                        "Tugas tidak valid.",
                    );
            }
            
            $credentials['status'] = "submitted";
            $credentials['submitted_at'] = now();

            $task->update($credentials);

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil mengumpulkan tugas.",
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
