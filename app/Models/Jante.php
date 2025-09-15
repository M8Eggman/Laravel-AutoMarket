<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jante extends Model
{
    /** @use HasFactory<\Database\Factories\JanteFactory> */
    use HasFactory;

    protected $fillable = [
        'size',
    ];

    public function cars()
    {
        return $this->hasMany(Car::class);
    }
}
