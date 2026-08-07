<?php

namespace App\Http\Controllers\Role;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Role\SyncRoleRequest;
use App\Models\Role;
use Illuminate\Support\Facades\Log;

class SyncRoleController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(SyncRoleRequest $request, Role $role)
    {
        Gate::authorize("role:manage");

        $credentials = $request->validated();

        try {
            $role->permissions()->sync($credentials['permissions']);

            return redirect()
                ->back()
                ->with(
                    "success",
                    "Berhasil merubah perizinan.",
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
