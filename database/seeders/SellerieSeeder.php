<?php

namespace Database\Seeders;

use App\Models\Sellerie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SellerieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $selleries = [
            ['type' => 'Cuir'],
            ['type' => 'Tissus'],
        ];
        
        foreach ($selleries as $sellerie) {
            Sellerie::create($sellerie);
        }
    }
}
