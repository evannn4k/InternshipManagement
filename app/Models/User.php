<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[
    Fillable([
        'name',
        'email',
        'school_id',
        'role_id',
        'password',
        'phone',
        'avatar',
        'is_active',
        'last_login_at',
    ]),
]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;


    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function hasRole($roleName) {
        return $this->role->name === $roleName;
    }

    public function hasPermission($permissionName)
    {
        return $this->role->permissions->contains('name', $permissionName);
    }

    public function getAllPermission()
    {
        return $this->role->permissions->pluck('name');
    }

    public function programs()
    {
        return $this->hasMany(Program::class);
    }

    public function placementAsMentor()
    {
        return $this->hasMany(Placement::class, 'mentor_id');
    }

    public function placementAsIntern()
    {
        return $this->hasMany(Placement::class, 'intern_id');
    }

    public function school()
    {
        return $this->belongsTo(School::class);
    }
}
