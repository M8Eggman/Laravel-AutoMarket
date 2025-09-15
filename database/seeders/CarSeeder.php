<?php

namespace Database\Seeders;

use App\Models\Car;
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

        Car::factory()
            ->create([
                'user_id' => $admin->id,
                'image1_path' => '/storage/voiture_seeder/1200x680.jpg',
                'image2_path' => '/storage/voiture_seeder/1200x680.jpg',
                'image3_path' => '/storage/voiture_seeder/1200x680.jpg',
                'image4_path' => '/storage/voiture_seeder/voiture-jaune-plus-de-valeur-marche-occasion.jpg',
            ]);
            
        Car::factory()
            ->count(100)
            ->create(['user_id' => $admin->id,]);
    }
}