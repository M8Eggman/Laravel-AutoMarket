<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = [
            ['hex' => '#F54927'],
            ['hex' => '#27F549'],
            ['hex' => '#2749F5'],
            ['hex' => '#F5F527'],
            ['hex' => '#FFFFFF'],
            ['hex' => '#000000'],
        ];
        foreach ($colors as $color) {
            Color::updateOrCreate($color);
        }
    }
}
