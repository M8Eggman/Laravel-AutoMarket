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

        Car::factory()->count(20)->create(['user_id' => $admin->id,]);
    }
}
