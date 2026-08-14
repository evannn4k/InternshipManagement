<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;


class UpdateTaskController extends Controller
{
    public function __invoke(UpdateTaskRequest $request, Task $task)
    {
        Gate::authorize("task:update");
        $credentials = $request->validated();

        try {
            if($task->status === "completed") {
                return redirect()
                    ->back()
                    ->with(
                        "error",
                        "Tugas telah selesai.",
                    );
            }

            $task->update($credentials);

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil mengubah data tugas.",
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
