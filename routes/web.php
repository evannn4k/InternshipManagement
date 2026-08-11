<?php

use App\Http\Controllers\DashboardController;

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ViewAuthController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Role\ViewRoleController;
use App\Http\Controllers\Role\SyncRoleController;

use App\Http\Controllers\School\CreateSchoolController;
use App\Http\Controllers\School\DeleteSchoolController;
use App\Http\Controllers\School\UpdateSchoolController;
use App\Http\Controllers\School\ViewSchoolController;
    
use App\Http\Controllers\Program\CreateProgramController;
use App\Http\Controllers\Program\DeleteProgramController;
use App\Http\Controllers\Program\UpdateProgramController;
use App\Http\Controllers\Program\ViewProgramController;

use App\Http\Controllers\User\CreateUserController;
use App\Http\Controllers\User\DeleteUserController;
use App\Http\Controllers\User\UpdateUserController;
use App\Http\Controllers\User\ViewUserController;
use App\Http\Controllers\User\ResetPasswordUserController;

use App\Http\Controllers\TestingController;
use Illuminate\Support\Facades\Route;

Route::get('/', TestingController::class);

Route::middleware('guest')->group(function () {
    Route::get('/login', [ViewAuthController::class, 'login'])->name('login');
    Route::post('/login', LoginController::class);

    Route::get('/register', [ViewAuthController::class, 'register'])->name('register');
    Route::post('/register', RegisterController::class);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', LogoutController::class);

    Route::get('/dashboard', DashboardController::class);


    Route::prefix("/role")->name("role.")->group(function () {
        Route::get('/', [ViewRoleController::class, "index"])->name("index");
        Route::put('/sync-permission/{role}', SyncRoleController::class);
    });

    Route::prefix("/school")->name("school.")->group(function () {
        Route::get('/', [ViewSchoolController::class, "index"])->name("index");
        Route::post('/', CreateSchoolController::class)->name("create");

        Route::get('/{school}', [ViewSchoolController::class, "show"])->name("show");
        Route::put('/{school}', UpdateSchoolController::class)->name("update");
        Route::delete('/{school}', DeleteSchoolController::class)->name("delete");
    });

    Route::prefix("/program")->name("program.")->group(function () {
        Route::get('/', [ViewProgramController::class, "index"])->name("index");
        Route::post('/', CreateProgramController::class)->name("create");

        Route::get('/{program}', [ViewProgramController::class, "show"])->name("show");
        Route::put('/{program}', UpdateProgramController::class)->name("update");
        Route::delete('/{program}', DeleteProgramController::class)->name("delete");
    });

    Route::prefix("/user")->name("user.")->group(function () {
        Route::get('/', [ViewUserController::class, "index"])->name("index");
        Route::post('/', CreateUserController::class)->name("create");

        Route::get('/{user}', [ViewUserController::class, "show"])->name("show");
        Route::patch('/reset-password/{user}', ResetPasswordUserController::class)->name("resetPassword");
        Route::put('/{user}', UpdateUserController::class)->name("update");
        Route::delete('/{user}', DeleteUserController::class)->name("delete");
    });
});
