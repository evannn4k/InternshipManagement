<?php

namespace App\Console\Commands;

use App\Models\Placement;
use App\Notifications\FcmNotification;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

#[Signature('app:send-placement-reminder')]
#[Description('Untuk mengingatkan durasi penampatan intern')]
class SendPlacementReminder extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
    {
        $nextWeek = now()->addWeek()->toDateString();
        $placements = Placement::with('intern:id,fcm_token')->where("end_date", $nextWeek)->get();

        Log::info("1. berhasil coy");
        if ($placements->count() > 0) {
            Log::info("2. berhasil coy");
            foreach ($placements as $placement) {
                $placement->intern->notify(new FcmNotification(title: "Durasi Penempatan Akan Habis!", body: "Durasi penempatanmu hanya tersisa 7 hari lagi!"));
            }
        }
    }
}
