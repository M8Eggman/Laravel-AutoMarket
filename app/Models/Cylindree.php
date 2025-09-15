<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cylindree extends Model
{
    /** @use HasFactory<\Database\Factories\CylindreeFactory> */
    use HasFactory;

    protected $fillable = [
        'size',
    ];

    public function cars()
    {
        return $this->hasMany(Car::class);
    }
}
