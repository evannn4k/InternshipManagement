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

        User::create([
            "name" => "evan",
            "email" => "evan@gmail.com",
            "password" => Hash::make("123123123"),
            "is_active" => true,
        ]);

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

        Permission::insert([
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
        ]);

        RoleHasPermission::insert([
            [
                "role_id" => 1,
                "permission_id" => 1
            ],
            [
                "role_id" => 1,
                "permission_id" => 2
            ],
            [
                "role_id" => 1,
                "permission_id" => 3
            ],
            [
                "role_id" => 1,
                "permission_id" => 4
            ]
        ]);
    }
}
