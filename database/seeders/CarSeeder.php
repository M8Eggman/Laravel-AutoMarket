<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Car;
use App\Models\Color;
use App\Models\Cylindree;
use App\Models\Fuel;
use App\Models\Jante;
use App\Models\Sellerie;
use App\Models\Type;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@example.com')->first();
        $brands = Brand::all();
        $jantes = Jante::all();
        $selleries = Sellerie::all();
        $colors = Color::all();
        $types = Type::all();
        $fuels = Fuel::all();
        $cylindrees = Cylindree::all();

        $carsData = [
            [
                'model' => 'Model 1',
                'etat' => 'Neuf',
                'annee' => 2023,
                'kilometrage' => 0,
                'abs' => true,
                'image1_path' => 'cars/car1_1.jpg',
                'image2_path' => 'cars/car1_2.jpg',
                'image3_path' => 'cars/car1_3.jpg',
                'image4_path' => 'cars/car1_4.jpg',
                'prix' => 26000,
                'description' => 'Description de la voiture 1',
            ],
            [
                'model' => 'Model 2',
                'etat' => 'Occasion',
                'annee' => 2022,
                'kilometrage' => 15000,
                'abs' => true,
                'image1_path' => 'cars/car2_1.jpg',
                'image2_path' => 'cars/car2_2.jpg',
                'image3_path' => 'cars/car2_3.jpg',
                'image4_path' => 'cars/car2_4.jpg',
                'prix' => 24000,
                'description' => 'Description de la voiture 2',
            ],
            [
                'model' => 'Model 3',
                'etat' => 'Neuf',
                'annee' => 2023,
                'kilometrage' => 0,
                'abs' => true,
                'image1_path' => 'cars/car3_1.jpg',
                'image2_path' => 'cars/car3_2.jpg',
                'image3_path' => 'cars/car3_3.jpg',
                'image4_path' => 'cars/car3_4.jpg',
                'prix' => 28000,
                'description' => 'Description de la voiture 3',
            ],
            [
                'model' => 'Model 4',
                'etat' => 'Occasion',
                'annee' => 2021,
                'kilometrage' => 30000,
                'abs' => true,
                'image1_path' => 'cars/car4_1.jpg',
                'image2_path' => 'cars/car4_2.jpg',
                'image3_path' => 'cars/car4_3.jpg',
                'image4_path' => 'cars/car4_4.jpg',
                'prix' => 22000,
                'description' => 'Description de la voiture 4',
            ],
            [
                'model' => 'Model 5',
                'etat' => 'Neuf',
                'annee' => 2023,
                'kilometrage' => 0,
                'abs' => true,
                'image1_path' => 'cars/car5_1.jpg',
                'image2_path' => 'cars/car5_2.jpg',
                'image3_path' => 'cars/car5_3.jpg',
                'image4_path' => 'cars/car5_4.jpg',
                'prix' => 30000,
                'description' => 'Description de la voiture 5',
            ],
        ];


        foreach ($carsData as $carData) {
            // Choisi un fuel aléatoire
            $fuel = $fuels->random();

            // Choisi la cylindrée selon le fuel
            $cylindree = $fuel->name === 'Electrique'
                ? $cylindrees->where('size', 'NONE')->first()
                : $cylindrees->where('size', '!=', 'NONE')->random();

            Car::create([
                ...$carData,
                'user_id' => $admin->id,
                'brand_id' => $brands->random()->id,
                'fuel_id' => $fuel->id,
                'jante_id' => $jantes->random()->id,
                'sellerie_id' => $selleries->random()->id,
                'color_id' => $colors->random()->id,
                'type_id' => $types->random()->id,
                'cylindree_id' => $cylindree->id,
            ]);
        }
    }
}
