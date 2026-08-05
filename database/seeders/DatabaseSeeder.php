<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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

        Permission::insert([
            [
                'name' => 'school:view',
            ],
            [
                'name' => 'school:create',
            ],
            [
                'name' => 'shcool:edit',
            ],
            [
                'name' => 'shcool:delete',
            ],
        ]);
    }
}
