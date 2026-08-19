<?php

use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

// use App\Events\UserPresenceUpdated;
use App\Http\Controllers\Admin\RoleController;
use Illuminate\Support\Facades\Mail;

Route::inertia('/', 'welcome')->name('home');

// Route::get('/test-reverb', function () {
//     UserPresenceUpdated::dispatch(
//         999,
//         'online',
//         now()->format('Y-m-d H:i:s'),
//         '127.0.0.1',
//     );

//     return response()->json([
//         'success' => true,
//         'message' => 'Evento enviado a Reverb',
//     ]);
// });

// Route::get('/test-email', function () {
//     Mail::raw(
//         'Este es un correo de prueba enviado desde SISEV.',
//         function ($message) {
//             $message
//                 ->to('anthonyansoni24@gmail.com')
//                 ->subject('Prueba SMTP - SISEV');
//         }
//     );

//     return 'Correo enviado correctamente.';
// });

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Rutas para la gestión de usuarios
    // Route::resource('users', UserController::class);
    Route::get('/users', [UserController::class, 'index'])
        ->middleware('permission:users.view')
        ->name('users.index');

    Route::get('/users/create', [UserController::class, 'create'])
        ->middleware('permission:users.create')
        ->name('users.create');

    Route::post('/users', [UserController::class, 'store'])
        ->middleware('permission:users.create')
        ->name('users.store');

    Route::get('/users/{user}', [UserController::class, 'show'])
        ->middleware('permission:users.view')
        ->name('users.show');

    Route::get('/users/{user}/edit', [UserController::class, 'edit'])
        ->middleware('permission:users.edit')
        ->name('users.edit');

    Route::put('/users/{user}', [UserController::class, 'update'])
        ->middleware('permission:users.edit')
        ->name('users.update');

    Route::delete('/users/{user}', [UserController::class, 'destroy'])
        ->middleware('permission:users.delete')
        ->name('users.destroy');

    // Rutas para la gestión de roles
    // Route::resource('roles', RoleController::class);
    Route::get('/roles', [RoleController::class, 'index'])
        ->middleware('permission:roles.view')
        ->name('roles.index');

    Route::get('/roles/create', [RoleController::class, 'create'])
        ->middleware('permission:roles.create')
        ->name('roles.create');

    Route::post('/roles', [RoleController::class, 'store'])
        ->middleware('permission:roles.create')
        ->name('roles.store');

    Route::get('/roles/{role}', [RoleController::class, 'show'])
        ->middleware('permission:roles.view')
        ->name('roles.show');

    Route::get('/roles/{role}/edit', [RoleController::class, 'edit'])
        ->middleware('permission:roles.edit')
        ->name('roles.edit');

    Route::put('/roles/{role}', [RoleController::class, 'update'])
        ->middleware('permission:roles.edit')
        ->name('roles.update');

    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])
        ->middleware('permission:roles.delete')
        ->name('roles.destroy');
});

require __DIR__ . '/settings.php';
