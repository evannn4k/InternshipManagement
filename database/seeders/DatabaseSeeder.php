<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\RoleHasPermission;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::create([
        //     "email" => "test@example.com",
        // ]);

        Role::insert([
            [
                'name' => 'admin',
            ],
            [
                'name' => 'mentor',
            ],
            [
                'name' => 'intern',
            ],
        ]);

        User::create([
            "name" => "evan",
            "email" => "evan@gmail.com",
            "password" => Hash::make("123123123"),
            "is_active" => true,
            "role_id" => 1,
        ]);

        Permission::insert([
            [
                'name' => 'role:manage',
            ],
            [
                'name' => 'school:read',
            ],
            [
                'name' => 'school:create',
            ],
            [
                'name' => 'school:update',
            ],
            [
                'name' => 'school:delete',
            ],
            // [
            //     'name' => 'user:reset-password',
            // ],
            [
                'name' => 'user:read',
            ],
            [
                'name' => 'user:create',
            ],
            [
                'name' => 'user:update',
            ],
            [
                'name' => 'user:delete',
            ],
            [
                'name' => 'program:read',
            ],
            [
                'name' => 'program:create',
            ],
            [
                'name' => 'program:update',
            ],
            [
                'name' => 'program:delete',
            ],
            [
                'name' => 'placement:read',
            ],
            [
                'name' => 'placement:create',
            ],
            [
                'name' => 'placement:update',
            ],
            [
                'name' => 'placement:delete',
            ],
            [
                'name' => 'task:read',
            ],
            [
                'name' => 'task:create',
            ],
            [
                'name' => 'task:update',
            ],
            [
                'name' => 'task:delete',
            ],
            [
                'name' => 'task:change-status',
            ],
            [
                'name' => 'task:submit',
            ],
            [
                'name' => 'task:review',
            ],
            [
                'name' => 'attendance:read',
            ],
            [
                'name' => 'attendance:create',
            ],
            [
                'name' => 'attendance:update',
            ],
            [
                'name' => 'attendance:delete',
            ],
            [
                'name' => 'attendance:check-out',
            ],
            [
                'name' => 'attendance:check-in',
            ],
            [
                'name' => 'weekly-report:read',
            ],
            [
                'name' => 'weekly-report:create',
            ],
            [
                'name' => 'weekly-report:update',
            ],
            [
                'name' => 'weekly-report:delete',
            ],
            [
                'name' => 'weekly-report:review',
            ],
        ]);

        RoleHasPermission::insert([
            [
                "role_id" => 1,
                "permission_id" => 1
            ],
        ]);
    }
}
