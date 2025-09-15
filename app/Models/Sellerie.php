<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sellerie extends Model
{
    /** @use HasFactory<\Database\Factories\SellerieFactory> */
    use HasFactory;

    protected $fillable = [
        'type',
    ];
    
    public function cars()
    {
        return $this->hasMany(Car::class);
    }
}
