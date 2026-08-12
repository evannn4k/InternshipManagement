<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('schools', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("npsn")->nullable()->unique();
            $table->text("address")->nullable();
            $table->string("city")->nullable();
            $table->string("province")->nullable();
            $table->string("contact_person_name")->nullable();
            $table->string("contact_person_phone")->nullable();
            $table->string("contact_person_email")->nullable();
            $table->text("notes")->nullable();
            $table->boolean("is_active")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schools');
    }
};
