<?php

namespace Database\Seeders;

use App\Models\Avatar;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $admin = Role::where('name', 'admin')->first();
        $modo = Role::where('name', 'modo')->first();
        $user = Role::where('name', 'user')->first();

        $users = [
            [
                'first_name' => 'Admin',
                'last_name' => 'Admin',
                'email' => 'admin@example.com',
                'phone' => '0400000001',
                'role_id' => $admin->id,
            ],
            [
                'first_name' => 'Modo',
                'last_name' => 'Modo',
                'email' => 'modo@example.com',
                'phone' => '0400000002',
                'role_id' => $modo->id,
            ],
            [
                'first_name' => 'User',
                'last_name' => 'User',
                'email' => 'user@example.com',
                'phone' => '0400000003',
                'role_id' => $user->id,
            ],
        ];

        foreach ($users as $userData) {
            $user = User::factory()->create($userData);
            Avatar::create([
                'user_id' => $user->id,
                'path' => null,
            ]);
        }
    }
}
