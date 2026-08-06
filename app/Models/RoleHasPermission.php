<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Relations\Pivot;

#[Guarded([''])]
class RoleHasPermission extends Pivot 
{
    protected $table = 'role_has_permissions';
    
    public $timestamps = false;
}
