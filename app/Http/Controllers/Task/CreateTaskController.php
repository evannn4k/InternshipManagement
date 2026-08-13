<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\Task\CreateTaskRequest;
use Illuminate\Support\Facades\Auth;

class CreateTaskController extends Controller
{
    public function __invoke(CreateTaskRequest $request)
    {
        Gate::authorize("task:create");
        $credentials = $request->validated();

        try {
            $credentials['created_by'] = Auth::user()->id;
            Task::create($credentials);

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil menambah data tugas.",
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
