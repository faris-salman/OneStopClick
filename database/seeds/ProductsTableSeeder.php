<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        foreach(range(1,10) as $index){
            DB::table('products')->insert([
                'name' => $faker->unique()->word,
                'details' => $faker->text,
                'description' => $faker->text,
                'price' => $faker->randomNumber(4)
            ]);
        }
    }
}
