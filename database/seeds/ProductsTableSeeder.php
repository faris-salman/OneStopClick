<?php

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
 
        // Create 50 product records
        for ($i = 0; $i < 50; $i++) {
            Product::create([
                'title' => $faker->name,
                'details' => $faker->text($maxNbChars = 100),
                'description' => $faker->paragraph,
                'price' => $faker->randomNumber(2),
                'promoted' => $faker->boolean(50)
            ]);
        }
    }
}
