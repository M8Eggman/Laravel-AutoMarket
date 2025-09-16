<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Str;

class BrandController extends Controller
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
        return Inertia::render('Brand/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:brands,name'],
            'logo' => ['required', 'image', 'max:5120'],
        ], [], [
            'name' => 'nom',
            'logo' => 'logo',
        ]);

        $brand = new Brand();
        $brand->name = $request->name;

        // Upload logo
        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $fileName = date('Y_m_d_His') . '_' . uniqid() . '_' . Str::slug($originalName) . '.' . $file->getClientOriginalExtension();

            // Stocke dans public/brands
            $filePath = $file->storeAs('brands', $fileName, 'public');

            $brand->logo = '/storage/' . $filePath;
        }

        $brand->save();

        return redirect()->route('administration')
            ->with('success', 'La marque a été ajoutée avec succès !');
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Brand $brand)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        //
    }
}
