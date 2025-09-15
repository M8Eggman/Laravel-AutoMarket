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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function fuel()
    {
        return $this->belongsTo(Fuel::class);
    }

    public function jante()
    {
        return $this->belongsTo(Jante::class);
    }

    public function sellerie()
    {
        return $this->belongsTo(Sellerie::class);
    }

    public function color()
    {
        return $this->belongsTo(Color::class);
    }

    public function type()
    {
        return $this->belongsTo(Type::class);
    }

    public function cylindree()
    {
        return $this->belongsTo(Cylindree::class);
    }
}
