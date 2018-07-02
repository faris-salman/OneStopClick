<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();

        return response()->json($products);
    }

    public function pagedIndex()
    {
        $products = Product::orderBy("id", "DESC")->paginate(5);

        return response()->json($products);
    }

    public function pagedIndexByOwner($owner)
    {
        $products = Product::where('owner', $owner)->orderBy("id", "DESC")->paginate(5);

        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $product = new Product();

        $product->name = $request->get('name');
        $product->details = $request->get('details');
        $product->description = $request->get('description');
        $product->price = $request->get('price');
        $product->owner = $request->get('owner');

        $product->save();

        return $product;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::find($id);

        return response()->json($product);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $product->update($request->all());
 
        // return response()->json($product, 200);

        try{
            //dd($request);
            $product = Product::findOrFail($id);
            $product->update($request->all());    
            return response()->json($product, 200);

        }catch(Exception $e){
            return response()->json('Error saving category');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        $product->delete();

        return response()->json('Product Deleted Succesfully');
    }
}
