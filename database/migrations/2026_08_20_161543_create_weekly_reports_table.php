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
        Schema::create('weekly_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('placement_id')->constrained('placements')->onDelete('cascade');
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null');

            $table->date('week_start_date');
            $table->date('week_end_date');
            
            $table->text('completed_work');
            $table->text('challenges')->nullable();
            $table->text('solutions')->nullable();
            $table->text('lessons_learned');
            $table->text('next_week_plan');
            $table->text('support_needed')->nullable();
            
            $table->enum('status', ['draft', 'submitted', 'revision_requested', 'approved'])->default('draft');
            $table->timestamp('submitted_at')->nullable();
            $table->text('mentor_feedback')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weekly_reports');
    }
};
