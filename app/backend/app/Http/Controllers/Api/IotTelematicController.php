<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\IotTelematic;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class IotTelematicController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'car_id' => ['required', 'exists:cars,id'],
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'fuel_level' => ['required', 'integer', 'min:0', 'max:100'],
            'engine_status' => ['required', 'string', 'in:running,idle,stopped,off'],
            'raw_payload' => ['nullable', 'array'],
            'recorded_at' => ['nullable', 'date'],
        ]);

        $telematic = IotTelematic::create([
            'car_id' => $validated['car_id'],
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
            'fuel_level' => $validated['fuel_level'],
            'engine_status' => $validated['engine_status'],
            'raw_payload' => $validated['raw_payload'] ?? null,
            'recorded_at' => $validated['recorded_at'] ?? now(),
        ]);

        return response()->json($telematic, 201);
    }
}
