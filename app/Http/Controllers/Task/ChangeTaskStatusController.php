<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\ChangeTaskStatusRequest;
use App\Models\Activity;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class ChangeTaskStatusController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(ChangeTaskStatusRequest $request, Task $task)
    {
        Gate::authorize("task:change-status");
        $credentials = $request->validated();

        try {
            if ($credentials['status'] === 'assigned' && $task->status !== 'draft') {
                return redirect()
                    ->back()
                    ->with(
                        "error",
                        "Status tugas tidak valid.",
                    );
            }

            if ($credentials['status'] === 'in_progress' && $task->status !== 'assigned') {
                return redirect()
                    ->back()
                    ->with(
                        "error",
                        "Status tugas tidak valid.",
                    );
            }

            if ($credentials['status'] === 'cancelled' && $task->status !== 'in_progress' && $task->status !== 'assigned') {
                return redirect()
                    ->back()
                    ->with(
                        "error",
                        "Status tugas tidak valid.",
                    );
            }

            $activity = [
                "user_id" => Auth::user()->id,
                "action" => "Task status changed.",
                "subject" => "task",
                "subject_id" => $task->id,
                "old_value" => $task->status,
                "new_value" => $credentials['status'],
                "ip_address" =>  $request->ip()
            ];

            Activity::create($activity);

            $task->started_at = now();
            $task->status = $credentials['status'];
            $task->save();

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil menambah memulai tugas.",
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
