<?php

namespace Database\Seeders;

use App\Models\Jante;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JanteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jantes = [
            ['size' => '16"'],
            ['size' => '17"'],
            ['size' => '18"'],
            ['size' => '19"'],
            ['size' => 'NONE'],
        ];
        foreach ($jantes as $jante) {
            Jante::updateOrCreate($jante);
        }
    }
}
