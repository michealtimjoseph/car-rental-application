<?php

namespace Database\Seeders;

use App\Models\Car;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Car::query()->delete();

        $cars = [
            [
                'brand' => 'Toyota',
                'model' => 'RAV4 Hybrid',
                'year' => 2024,
                'plate_number' => 'AB-1024-TY',
                'category' => 'SUV',
                'price_per_day' => 89.00,
                'status' => 'available',
                'specs' => [
                    'transmission' => 'Automatic',
                    'seats' => 5,
                    'fuel_type' => 'Hybrid',
                    'drive' => 'AWD',
                    'color' => 'Silver',
                ],
            ],
            [
                'brand' => 'BMW',
                'model' => '3 Series',
                'year' => 2023,
                'plate_number' => 'CD-4467-BM',
                'category' => 'Sedan',
                'price_per_day' => 120.00,
                'status' => 'available',
                'specs' => [
                    'transmission' => 'Automatic',
                    'seats' => 5,
                    'fuel_type' => 'Petrol',
                    'drive' => 'RWD',
                    'color' => 'Black',
                ],
            ],
            [
                'brand' => 'Tesla',
                'model' => 'Model 3',
                'year' => 2024,
                'plate_number' => 'EF-8012-TS',
                'category' => 'Electric',
                'price_per_day' => 135.00,
                'status' => 'available',
                'specs' => [
                    'transmission' => 'Automatic',
                    'seats' => 5,
                    'fuel_type' => 'Electric',
                    'drive' => 'AWD',
                    'battery_range_km' => 500,
                    'color' => 'White',
                ],
            ],
            [
                'brand' => 'Mercedes',
                'model' => 'GLC 300',
                'year' => 2022,
                'plate_number' => 'GH-2209-MB',
                'category' => 'SUV',
                'price_per_day' => 110.00,
                'status' => 'available',
                'specs' => [
                    'transmission' => 'Automatic',
                    'seats' => 5,
                    'fuel_type' => 'Petrol',
                    'drive' => 'AWD',
                    'color' => 'Blue',
                ],
            ],
            [
                'brand' => 'Honda',
                'model' => 'Accord Sport',
                'year' => 2021,
                'plate_number' => 'IJ-7741-HN',
                'category' => 'Sedan',
                'price_per_day' => 95.00,
                'status' => 'available',
                'specs' => [
                    'transmission' => 'Automatic',
                    'seats' => 5,
                    'fuel_type' => 'Hybrid',
                    'drive' => 'FWD',
                    'color' => 'Red',
                ],
            ],
        ];

        foreach ($cars as $car) {
            Car::create($car);
        }
    }
}
