<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    /** @use HasFactory<\Database\Factories\CarFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'brand_id',
        'fuel_id',
        'jante_id',
        'sellerie_id',
        'color_id',
        'type_id',
        'cylindree_id',
        'model',
        'etat',
        'annee',
        'kilometrage',
        'abs',
        'image1_path',
        'image2_path',
        'image3_path',
        'image4_path',
        'prix',
        'description',
    ];
}
