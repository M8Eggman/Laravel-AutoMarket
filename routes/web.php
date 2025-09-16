<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
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
