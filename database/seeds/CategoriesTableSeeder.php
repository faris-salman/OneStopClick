<?php

use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now()->toDateTimeString();

        Category::insert([
            ['name' => 'Movie', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Music', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Game', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Anime', 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
