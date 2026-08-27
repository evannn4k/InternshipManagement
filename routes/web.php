<?php

use App\Http\Controllers\Attendance\CheckInAttendanceController;
use App\Http\Controllers\Attendance\CheckOutAttendanceController;
use App\Http\Controllers\Attendance\CreateAttendanceController;
use App\Http\Controllers\Attendance\DeleteAttendanceController;
use App\Http\Controllers\Attendance\UpdateAttendanceController;
use App\Http\Controllers\Attendance\ViewAttendanceController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ViewAuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Document\AcceptDocumentController;
use App\Http\Controllers\Document\CreateDocumentController;
use App\Http\Controllers\Document\DeleteDocumentController;
use App\Http\Controllers\Document\RejectDocumentController;
use App\Http\Controllers\Document\ViewDocumentController;
use App\Http\Controllers\Placement\CompletePlacementController;
use App\Http\Controllers\Placement\CreatePlacementController;
use App\Http\Controllers\Placement\DeletePlacementController;
use App\Http\Controllers\Placement\TerminatePlacementController;
use App\Http\Controllers\Placement\UpdatePlacementController;
use App\Http\Controllers\Placement\ViewPlacementController;
use App\Http\Controllers\Program\CreateProgramController;
use App\Http\Controllers\Program\DeleteProgramController;
use App\Http\Controllers\Program\UpdateProgramController;
use App\Http\Controllers\Program\ViewProgramController;
use App\Http\Controllers\Role\SyncRoleController;
use App\Http\Controllers\Role\ViewRoleController;
use App\Http\Controllers\School\CreateSchoolController;
use App\Http\Controllers\School\DeleteSchoolController;
use App\Http\Controllers\School\UpdateSchoolController;
use App\Http\Controllers\School\ViewSchoolController;
use App\Http\Controllers\Task\ChangeTaskStatusController;
use App\Http\Controllers\Task\CompletedTaskController;
use App\Http\Controllers\Task\CreateTaskController;
use App\Http\Controllers\Task\DeleteTaskController;
use App\Http\Controllers\Task\RevisionTaskController;
use App\Http\Controllers\Task\SubmitTaskController;
use App\Http\Controllers\Task\UpdateTaskController;
use App\Http\Controllers\Task\ViewTaskController;
use App\Http\Controllers\TestingController;
use App\Http\Controllers\User\CreateUserController;
use App\Http\Controllers\User\DeleteUserController;
use App\Http\Controllers\User\ResetPasswordUserController;
use App\Http\Controllers\User\UpdateUserController;
use App\Http\Controllers\User\ViewUserController;
use App\Http\Controllers\WeeklyReport\ApproveWeeklyReportController;
use App\Http\Controllers\WeeklyReport\CreateWeeklyReportController;
use App\Http\Controllers\WeeklyReport\DeleteWeeklyReportController;
use App\Http\Controllers\WeeklyReport\RevisionWeeklyReportController;
use App\Http\Controllers\WeeklyReport\SubmitWeeklyReportController;
use App\Http\Controllers\WeeklyReport\UpdateWeeklyReportController;
use App\Http\Controllers\WeeklyReport\ViewWeeklyReportController;
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

    Route::prefix('/user')->name('user.')->group(function () {
        Route::get('/', [ViewUserController::class, 'index'])->name('index');
        Route::post('/', CreateUserController::class)->name('create');

        Route::get('/{user}', [ViewUserController::class, 'show'])->name('show');
        Route::patch('/reset-password/{user}', ResetPasswordUserController::class)->name('resetPassword');
        Route::put('/{user}', UpdateUserController::class)->name('update');
        Route::delete('/{user}', DeleteUserController::class)->name('delete');
    });

    Route::prefix('/role')->name('role.')->group(function () {
        Route::get('/', [ViewRoleController::class, 'index'])->name('index');
        Route::put('/sync-permission/{role}', SyncRoleController::class);
    });

    Route::prefix('/school')->name('school.')->group(function () {
        Route::get('/', [ViewSchoolController::class, 'index'])->name('index');
        Route::post('/', CreateSchoolController::class)->name('create');

        Route::get('/{school}', [ViewSchoolController::class, 'show'])->name('show');
        Route::put('/{school}', UpdateSchoolController::class)->name('update');
        Route::delete('/{school}', DeleteSchoolController::class)->name('delete');
    });

    Route::prefix('/program')->name('program.')->group(function () {
        Route::get('/', [ViewProgramController::class, 'index'])->name('index');
        Route::post('/', CreateProgramController::class)->name('create');

        Route::get('/{program}', [ViewProgramController::class, 'show'])->name('show');
        Route::put('/{program}', UpdateProgramController::class)->name('update');
        Route::delete('/{program}', DeleteProgramController::class)->name('delete');
    });

    Route::prefix('/placement')->name('placement.')->group(function () {
        Route::get('/', [ViewPlacementController::class, 'index'])->name('index');
        Route::post('/', CreatePlacementController::class)->name('create');

        Route::get('/{placement}', [ViewPlacementController::class, 'show'])->name('show');
        Route::put('/{placement}', UpdatePlacementController::class)->name('update');
        Route::patch('/{placement}/terminate', TerminatePlacementController::class)->name('terminate');
        Route::patch('/{placement}/complete', CompletePlacementController::class)->name('complete');
        Route::delete('/{placement}', DeletePlacementController::class)->name('delete');
    });

    Route::prefix('/task')->name('task.')->group(function () {
        Route::get('/', [ViewTaskController::class, 'index'])->name('index');
        Route::post('/', CreateTaskController::class)->name('create');

        Route::get('/{task}', [ViewTaskController::class, 'show'])->name('show');
        Route::put('/{task}', UpdateTaskController::class)->name('update');
        Route::patch('/{task}/change-status', ChangeTaskStatusController::class)->name('change-status');
        Route::put('/{task}/submit', SubmitTaskController::class)->name('submit');
        Route::put('/{task}/revision', RevisionTaskController::class)->name('revision');
        Route::put('/{task}/completed', CompletedTaskController::class)->name('completed');
        Route::delete('/{task}', DeleteTaskController::class)->name('delete');
    });

    Route::prefix('/attendance')->name('attendance.')->group(function () {
        Route::get('/', [ViewAttendanceController::class, 'index'])->name('index');
        Route::get('/summary', [ViewAttendanceController::class, 'summary'])->name('summary');
        Route::post('/', CreateAttendanceController::class)->name('create');
        Route::post('/check-in', CheckInAttendanceController::class)->name('check-in');

        Route::get('/{attendance}', [ViewAttendanceController::class, 'show'])->name('show');
        Route::put('/{attendance}/check-out', CheckOutAttendanceController::class)->name('check-out');
        Route::put('/{attendance}', UpdateAttendanceController::class)->name('update');
        Route::delete('/{attendance}', DeleteAttendanceController::class)->name('delete');
    });

    Route::prefix('/weekly-report')->name('weekly-report.')->group(function () {
        Route::get('/', [ViewWeeklyReportController::class, 'index'])->name('index');
        Route::post('/', CreateWeeklyReportController::class)->name('create');

        Route::put('/{weeklyReport}/revision', RevisionWeeklyReportController::class)->name('revision');
        Route::put('/{weeklyReport}/approve', ApproveWeeklyReportController::class)->name('approve');
        Route::patch('/{weeklyReport}/submit', SubmitWeeklyReportController::class)->name('submit');
        Route::get('/{weeklyReport}', [ViewWeeklyReportController::class, 'show'])->name('show');
        Route::put('/{weeklyReport}', UpdateWeeklyReportController::class)->name('update');
        Route::delete('/{weeklyReport}', DeleteWeeklyReportController::class)->name('delete');
    });

    Route::prefix('/document')->name('document.')->group(function () {
        Route::get('/', [ViewDocumentController::class, 'index'])->name('index');
        Route::post('/', CreateDocumentController::class)->name('create');

        Route::get('/{document}', [ViewDocumentController::class, "show"])->name("show");
        Route::put('/{document}/accept', AcceptDocumentController::class)->name("update");
        Route::put('/{document}/reject', RejectDocumentController::class)->name("update");
        Route::delete('/{document}', DeleteDocumentController::class)->name("delete");
    });
});
