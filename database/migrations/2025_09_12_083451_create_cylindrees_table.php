<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cylindrees', function (Blueprint $table) {
            $table->id();
            $table->enum('size', ['1l', '1.2l', '1.5l', '1.8l', '2l', '3l', 'NONE']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cylindrees');
    }
};
