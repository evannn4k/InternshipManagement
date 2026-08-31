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
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('placement_id')->constrained('placements')->cascadeOnDelete();
            $table->foreignId('evaluator_id')->constrained('users')->cascadeOnDelete();

            $table->string('evaluation_type');
            $table->date('period_start_date');
            $table->date('period_end_date');

            $table->unsignedTinyInteger('reliability_score');
            $table->unsignedTinyInteger('learning_score');
            $table->unsignedTinyInteger('code_quality_score');
            $table->unsignedTinyInteger('problem_solving_score');
            $table->unsignedTinyInteger('collaboration_score');
            $table->unsignedTinyInteger('communication_score');
            $table->unsignedTinyInteger('documentation_score');

            $table->text('strengths');
            $table->text('improvement_areas');
            $table->text('action_plan')->nullable();
            $table->text('overall_comment');

            $table->boolean('is_visible_to_intern')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluations');
    }
};
