<?php

use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\IotTelematicController;
use Illuminate\Support\Facades\Route;

Route::get('/cars', [CarController::class, 'index']);
Route::get('/cars/{id}', [CarController::class, 'show']);
Route::post('/telematics', [IotTelematicController::class, 'store']);
