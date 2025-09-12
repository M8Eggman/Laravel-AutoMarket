<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            ['name' => 'Toyota', 'logo' => 'logos/toyota.png'],
            ['name' => 'BMW', 'logo' => 'logos/bmw.png'],
            ['name' => 'Mercedes', 'logo' => 'logos/mercedes.png'],
            ['name' => 'Tesla', 'logo' => 'logos/tesla.png'],
            ['name' => 'Renault', 'logo' => 'logos/renault.png'],
        ];

        foreach ($brands as $brand) {
            Brand::create($brand);
        }
    }
}
