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
            ['name' => 'Toyota', 'logo' => '/storage/marque_seeder/toyota-logo.png'],
            ['name' => 'BMW', 'logo' => '/storage/marque_seeder/BMW.svg'],
            ['name' => 'Mercedes', 'logo' => '/storage/marque_seeder/Mercedes-Logo.png'],
            ['name' => 'Tesla', 'logo' => '/storage/marque_seeder/Tesla_logo.png'],
            ['name' => 'Renault', 'logo' => '/storage/marque_seeder/renault.jpg'],
        ];

        foreach ($brands as $brand) {
            Brand::create($brand);
        }
    }
}
