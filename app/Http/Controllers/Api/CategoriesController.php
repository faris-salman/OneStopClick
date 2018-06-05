<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoriesController extends Controller
{
    public function index()
    {
        return Category::all();
    }
 
    // public function show(Category $category)
    // {
    //     return $category;
    // }
 
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:categories|max:100'
        ]);

        $category = Category::create($request->all());
 
        return response()->json($category, 201);
    }
 
    public function update(Request $request, Category $category)
    {
        $category->update($request->all());
 
        return response()->json($category, 200);
    }
 
    public function delete(Category $category)
    {
        $category->delete();
 
        return response()->json(null, 204);
    }
}
