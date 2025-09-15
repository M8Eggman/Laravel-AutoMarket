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
            ['hex' => '#F54927', 'name' => 'Rouge vif'],
            ['hex' => '#27F549', 'name' => 'Vert vif'],
            ['hex' => '#2749F5', 'name' => 'Bleu vif'],
            ['hex' => '#F5F527', 'name' => 'Jaune vif'],
            ['hex' => '#FFFFFF', 'name' => 'Blanc'],
            ['hex' => '#000000', 'name' => 'Noir'],
        ];

        foreach ($colors as $color) {
            Color::create($color);
        }
    }
}
