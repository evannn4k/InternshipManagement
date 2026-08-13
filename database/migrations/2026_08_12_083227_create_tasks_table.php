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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('placement_id')->constrained("placements")->cascadeOnDelete();
            $table->foreignId('reviewed_by')->nullable()->constrained("users")->cascadeOnDelete();
            $table->foreignId('created_by')->constrained("users")->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->text('acceptance_criteria');
            $table->enum('priority', ['low', 'medium', 'high', 'urgent']);
            $table->enum('status', [
                "draft",
                "assigned",
                "in_progress",
                "submitted",
                "revision_requested",
                "completed",
                "cancelled"
            ]);
            $table->date('start_date')->nullable();
            $table->date('due_date')->nullable();
            $table->decimal('estimated_hours')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->text('submission_notes')->nullable();
            $table->string('repository_url')->nullable();
            $table->string('demo_url')->nullable();
            $table->text('review_notes')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
