<?php

namespace Database\Seeders;

use App\Models\Type;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            ['name' => '4X4'],
            ['name' => 'SUV'],
            ['name' => 'BREAK'],
            ['name' => 'LUDOSPACE'],
            ['name' => 'VAN'],
            ['name' => 'BERLINE'],
        ];
        
        foreach ($types as $type) {
            Type::create($type);
        }

    }
}
