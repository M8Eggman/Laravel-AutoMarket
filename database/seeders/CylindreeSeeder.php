<?php

namespace Database\Seeders;

use App\Models\Cylindree;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CylindreeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cylindrees = [
            ['size' => '1l'],
            ['size' => '1.2l'],
            ['size' => '1.5l'],
            ['size' => '1.8l'],
            ['size' => '2l'],
            ['size' => '3l'],
            ['size' => 'NONE'],
        ];
        
        foreach ($cylindrees as $cyl) {
            Cylindree::create($cyl);
        }
    }
}
