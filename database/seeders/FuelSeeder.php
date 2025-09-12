<?php

namespace Database\Seeders;

use App\Models\Fuel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FuelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fuels = [
            ['name' => 'Essence'],
            ['name' => 'Diesel'],
            ['name' => 'Electrique'],
        ];

        foreach ($fuels as $fuel) {
            Fuel::create($fuel);
        }
    }
}
