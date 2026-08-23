<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Car extends Model
{
    protected $fillable = [
        'brand',
        'model',
        'year',
        'plate_number',
        'category',
        'price_per_day',
        'status',
        'specs',
    ];

    protected function casts(): array
    {
        return [
            'year' => 'integer',
            'price_per_day' => 'decimal:2',
            'specs' => 'array',
        ];
    }

    public function rentals(): HasMany
    {
        return $this->hasMany(Rental::class);
    }

    public function iotTelematics(): HasMany
    {
        return $this->hasMany(IotTelematic::class);
    }

    public function latestTelematics(): HasOne
    {
        return $this->hasOne(IotTelematic::class)->latestOfMany();
    }
}
