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
        Schema::create('cars', function (Blueprint $table) {
            $table->id();

            $table->string('model');
            $table->enum('etat', ['Neuf', 'Occasion']);
            $table->year('annee');
            $table->integer('kilometrage');
            $table->boolean('abs')->default(false);

            $table->decimal('prix', 12, 2);
            $table->longText('description');

            $table->string('image1_path');
            $table->string('image2_path')->nullable();
            $table->string('image3_path')->nullable();
            $table->string('image4_path')->nullable();

            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('brand_id')->nullable()->constrained('brands')->nullOnDelete();
            $table->foreignId('fuel_id')->nullable()->constrained('fuels')->nullOnDelete();
            $table->foreignId('jante_id')->nullable()->constrained('jantes')->nullOnDelete();
            $table->foreignId('sellerie_id')->nullable()->constrained('selleries')->nullOnDelete();
            $table->foreignId('color_id')->nullable()->constrained('colors')->nullOnDelete();
            $table->foreignId('type_id')->nullable()->constrained('types')->nullOnDelete();
            $table->foreignId('cylindree_id')->nullable()->constrained('cylindrees')->nullOnDelete();

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
