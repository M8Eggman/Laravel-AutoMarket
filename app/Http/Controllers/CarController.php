<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        return Inertia::render('Car/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
