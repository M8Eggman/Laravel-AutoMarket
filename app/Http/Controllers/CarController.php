<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Car;
use App\Models\Color;
use App\Models\Cylindree;
use App\Models\Fuel;
use App\Models\Jante;
use App\Models\Sellerie;
use App\Models\Type;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Str;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $brands = Brand::all();
        $fuels = Fuel::all();
        $jantes = Jante::all();
        $selleries = Sellerie::all();
        $colors = Color::all();
        $types = Type::all();
        $cylindrees = Cylindree::all();

        return Inertia::render('Car/Create', compact(
            'brands',
            'fuels',
            'jantes',
            'selleries',
            'colors',
            'types',
            'cylindrees'
        ));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate des entrée
        $request->validate([
            'model' => ['required', 'string', 'max:255'],
            'etat' => ['required', 'in:Neuf,Occasion'],
            'annee' => ['required', 'digits:4', 'integer', 'min:1975', 'max:' . date('Y')],
            'kilometrage' => ['nullable', 'integer', 'min:0'],
            'abs' => ['boolean'],
            'prix' => ['required', 'numeric', 'min:0'],
            'description' => ['required', 'string'],
            'image1_path' => ['required', 'image', 'max:5120'],
            'image2_path' => ['nullable', 'image', 'max:5120'],
            'image3_path' => ['nullable', 'image', 'max:5120'],
            'image4_path' => ['nullable', 'image', 'max:5120'],
            'brand_id' => ['required', 'exists:brands,id'],
            'fuel_id' => ['required', 'exists:fuels,id'],
            'jante_id' => ['required', 'exists:jantes,id'],
            'sellerie_id' => ['required', 'exists:selleries,id'],
            'color_id' => ['required', 'exists:colors,id'],
            'type_id' => ['required', 'exists:types,id'],
            'cylindree_id' => ['required', 'exists:cylindrees,id'],
        ], [], [
            'model' => 'modèle',
            'etat' => 'état',
            'annee' => 'année',
            'kilometrage' => 'kilométrage',
            'abs' => 'ABS',
            'prix' => 'prix',
            'description' => 'description',
            'image1_path' => "image 1",
            'image2_path' => "image 2",
            'image3_path' => "image 3",
            'image4_path' => "image 4",
            'brand_id' => 'marque',
            'fuel_id' => 'carburant',
            'jante_id' => 'jantes',
            'sellerie_id' => 'sellerie',
            'color_id' => 'couleur',
            'type_id' => 'type',
            'cylindree_id' => 'cylindrée',
        ]);

        $car = new Car();

        $car->model = $request->model;
        $car->etat = $request->etat;
        $car->annee = $request->annee;
        $car->kilometrage = $request->kilometrage;
        $car->abs = $request->abs;
        $car->prix = $request->prix;
        $car->description = $request->description;

        // Gestion des images
        foreach (range(1, 4) as $i) {
            $field = "image{$i}_path";

            if ($request->hasFile($field)) {
                $file = $request->file($field);

                // Nom friendly + date + unique
                $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                $fileName = date('Y_m_d_His') . '_' . uniqid() . '_' . Str::slug($originalName) . '.' . $file->getClientOriginalExtension();

                // Stocke l'image dans public/voiture
                $filePath = $file->storeAs('voiture', $fileName, 'public');

                $car->$field = "\storage\{$filePath}";
            }
        }

        // Foreign keys
        $car->brand_id = $request->brand_id;
        $car->fuel_id = $request->fuel_id;
        $car->jante_id = $request->jante_id;
        $car->sellerie_id = $request->sellerie_id;
        $car->color_id = $request->color_id;
        $car->type_id = $request->type_id;
        $car->cylindree_id = $request->cylindree_id;


        // Si voiture électrique cylindrée  = NONE 
        $fuel = Fuel::find($request->fuel_id);
        if ($fuel?->name === 'Electrique') {
            $car->cylindree_id = Cylindree::where("size", "NONE")->first()?->id ?? null;
        }

        // Si voiture neuve kilométrage = 0
        if ($request->etat === 'Neuf') {
            $car->kilometrage = 0;
        }

        // Utilisateur connecté
        $car->user_id = auth()->id();

        $car->save();

        return redirect()->route('cars.show', $car->id)
            ->with('success', 'Votre voiture a été ajoutée avec succès !');

    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $car = Car::with([
            'brand',
            'fuel',
            'type',
            'jante',
            'sellerie',
            'color',
            'cylindree',
            'user'
        ])->findOrFail($id);

        $prix = $car->prix;
        $apport = 9000;
        $duree = 60;
        $tauxAnnuel = 3;

        $montantEmprunte = $prix - $apport;
        $tauxMensuel = $tauxAnnuel / 100 / 12;

        $mensualite = round($montantEmprunte * ($tauxMensuel / (1 - pow(1 + $tauxMensuel, -$duree))), 2);

        $financement = [
            'prix' => $prix,
            'taeg' => $tauxAnnuel,
            'mensualite' => $mensualite,
            'apport' => $apport,
            'duree' => $duree,
        ];

        return Inertia::render('Car/Show', compact('car', 'financement'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Car $car)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Car $car)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Car $car)
    {
        //
    }
}
