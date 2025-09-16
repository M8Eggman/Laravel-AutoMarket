<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

// Route voitures
Route::get('/cars/create', [CarController::class, 'create'])
    ->name('cars.create')
    ->middleware('auth');
Route::post('/cars/store', [CarController::class, 'store'])
    ->name('cars.store')
    ->middleware('auth');
Route::delete('/cars/{id}/destroy', [CarController::class, 'destroy'])
    ->name('cars.destroy')
    ->middleware(['auth', 'role:admin,modo']);
Route::get('/cars/{id}/show', [CarController::class, 'show'])->name('cars.show');

// route marque
Route::get('/brands/create', [BrandController::class, 'create'])
    ->name('brands.create')
    ->middleware(['auth', 'role:admin,modo']);
Route::post('/brands/store', [BrandController::class, 'store'])
    ->name('brands.store')
    ->middleware(['auth', 'role:admin,modo']);

Route::delete('/users/{id}/destroy', [UserController::class, 'destroy'])
    ->name('users.destroy')
    ->middleware(['auth', 'role:admin']);
Route::put('/users/{id}/change_role', [UserController::class, 'change_role'])
    ->name('users.change_role')
    ->middleware(['auth', 'role:admin']);

// route administration
Route::get('/administration', [HomeController::class, 'index_admin'])
    ->name('administration')
    ->middleware(['auth', 'role:admin,modo']);

// Redirection vers home
Route::get('/dashboard', function () {
    return Inertia::location(route("home"));
})->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
