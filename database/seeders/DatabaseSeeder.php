<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'ngvandung',
            'email' => 'nguyendungnd204@gmail.com',
            'password' => bcrypt('12345678'),
            'email_verified_at' => time(),
        ]);

        \App\Models\Project::factory()
            ->count(30)
            ->hasTasks(30) // Assuming each project has 5 tasks
            ->create();
    }
}
