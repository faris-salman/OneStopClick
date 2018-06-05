<?php

use App\Models\Category;
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
        $faker = \Faker\Factory::create();
 
        // Create 10 category records
        for ($i = 0; $i < 10; $i++) {
            Category::create([
                'name' => $faker->lastName
            ]);
        }
    }
}
