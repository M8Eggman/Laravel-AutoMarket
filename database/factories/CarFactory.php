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

        // Choix cylindrée selon le fuel
        $cylindree = $fuel->name === 'Electrique'
            ? Cylindree::where('size', 'NONE')->first()
            : Cylindree::all()->where('size', '!=', 'NONE')->random();

        // Récupère les fichiers dans storage/voiture_seeder
        $files = Storage::disk('public')->allFiles('voiture_seeder');

        // Choisis une image du tableau
        $image = '/storage/' . fake()->randomElement($files);

        // Choisis le nombre d'images qui vont être déternminée
        $numberOfImages = rand(1, 4);

        $imagePaths = [];

        // Selon le nombre d'images remplis le tableau avec la même image pour tous  
        for ($i = 0; $i <= 3; $i++) {
            $i <= $numberOfImages
                ? $imagePaths[$i] = $image
                : $imagePaths[$i] = null;
        }

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
            'annee' => $this->faker->numberBetween(1975, date('Y')),
            'kilometrage' => $this->faker->numberBetween(0, 150000),
            'abs' => $this->faker->boolean(),
            'image1_path' => $imagePaths[0],
            'image2_path' => $imagePaths[1],
            'image3_path' => $imagePaths[2],
            'image4_path' => $imagePaths[3],
            'prix' => $this->faker->numberBetween(15000, 60000),
            'description' => $this->faker->sentence(12),
        ];
    }
}
