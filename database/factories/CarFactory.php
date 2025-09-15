<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Cylindree;
use App\Models\Fuel;
use App\Models\Jante;
use App\Models\Sellerie;
use App\Models\Color;
use App\Models\Type;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Car>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fuel = Fuel::all()->random();
        $files = Storage::disk('public')->allFiles('voiture_seeder');

        // Choix cylindrée selon le fuel
        $cylindree = $fuel->name === 'Electrique'
            ? Cylindree::where('size', 'NONE')->first()
            : Cylindree::all()->where('size', '!=', 'NONE')->random();

        return [
            'user_id' => User::all()->random()->id,
            'brand_id' => Brand::all()->random()->id,
            'fuel_id' => $fuel->id,
            'cylindree_id' => $cylindree->id,
            'jante_id' => Jante::all()->random()->id,
            'sellerie_id' => Sellerie::all()->random()->id,
            'color_id' => Color::all()->random()->id,
            'type_id' => Type::all()->random()->id,

            'model' => $this->faker->word(),
            'etat' => $this->faker->randomElement(['Neuf', 'Occasion']),
            'annee' => $this->faker->year(),
            'kilometrage' => $this->faker->numberBetween(0, 150000),
            'abs' => $this->faker->boolean(),
            'image1_path' => $this->faker->randomElement($files),
            'image2_path' => 'cars/sample2.jpg',
            'image3_path' => 'cars/sample3.jpg',
            'image4_path' => 'cars/sample4.jpg',
            'prix' => $this->faker->numberBetween(15000, 60000),
            'description' => $this->faker->sentence(12),
        ];
    }
}
