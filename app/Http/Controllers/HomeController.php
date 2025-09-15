<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Car;
use App\Models\Fuel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $brands = Brand::all();
        $fuels = Fuel::all();
        $cars = Car::with(['brand', 'fuel', 'type'])->get();
        return Inertia::render('Home', compact('brands', 'fuels', 'cars'));
    }
}
