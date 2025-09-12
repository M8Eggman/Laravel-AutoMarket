<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            BrandSeeder::class,
            FuelSeeder::class,
            JanteSeeder::class,
            SellerieSeeder::class,
            ColorSeeder::class,
            TypeSeeder::class,
            CylindreeSeeder::class,
            CarSeeder::class,
        ]);
    }
}
