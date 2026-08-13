<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Model;

#[Guarded([''])]
class Task extends Model
{
    public function placement()
    {
        return $this->belongsTo(Placement::class);
    }

    public function reviewedBy()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    
}
