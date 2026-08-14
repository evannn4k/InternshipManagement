<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class DeleteTaskController extends Controller
{
    /**
     * Handle the incoming request.
     */
     public function __invoke(Task $task)
     {  
         Gate::authorize("task:delete");
         
         try {
             $task->delete();
 
             return redirect()
                 ->back()
                 ->with(
                     "success",
                     "Berhasil menghapus data tugas.",
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
