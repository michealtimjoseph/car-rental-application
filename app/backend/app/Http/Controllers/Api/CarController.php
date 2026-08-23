<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\JsonResponse;

class CarController extends Controller
{
    public function index(): JsonResponse
    {
        $cars = Car::where('status', 'available')
            ->with('latestTelematics')
            ->get();

        return response()->json($cars);
    }

    public function show($id): JsonResponse
    {
        $car = Car::with('latestTelematics')->findOrFail($id);

        return response()->json($car);
    }
}
