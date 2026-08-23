<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class IotTelematic extends Model
{
    protected $fillable = [
        'car_id',
        'latitude',
        'longitude',
        'fuel_level',
        'engine_status',
        'raw_payload',
        'recorded_at',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'float',
            'longitude' => 'float',
            'fuel_level' => 'integer',
            'raw_payload' => 'array',
            'recorded_at' => 'datetime',
        ];
    }

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }
}
