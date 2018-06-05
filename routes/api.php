<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'password'],function() {
	Route::post('/email', 'Auth\ForgotPasswordController@getResetToken');
	Route::post('/reset', 'Auth\ResetPasswordController@reset');
});

Route::group(['prefix'=> 'auth'],function(){
    Route::post('/register','Auth\RegisterController@register');
    Route::post("/login",'Auth\LoginController@login');
    Route::post('/login/{social}/callback','Auth\LoginController@handleProviderCallback')->where('social','twitter|facebook|linkedin|google|');
});

Route::middleware(['jwt_auth'])->group(function(){
   Route::get('/hello',function(){
       return "Cool dude";
   });
});

Route::group(['prefix' => 'products'], function(){

    /**
    **Basic Routes for a RESTful service:
    **Route::get($uri, $callback);
    **Route::post($uri, $callback);
    **Route::put($uri, $callback);
    **Route::delete($uri, $callback);
    **
    */
    Route::get('/', 'ProductsController@index');
 
    Route::get('/{product}', 'ProductsController@show');
    
    Route::post('/','ProductsController@store');
    
    Route::put('/{product}','ProductsController@update');
    
    Route::delete('/{product}', 'ProductsController@delete');

});

Route::group(['prefix' => 'categories'], function(){

    /**
    **Basic Routes for a RESTful service:
    **Route::get($uri, $callback);
    **Route::post($uri, $callback);
    **Route::put($uri, $callback);
    **Route::delete($uri, $callback);
    **
    */
    Route::get('/', 'CategoriesController@index');
 
    Route::get('/{category}', 'CategoriesController@show');
    
    Route::post('/','CategoriesController@store');
    
    Route::put('/{category}','CategoriesController@update');
    
    Route::delete('/{category}', 'CategoriesController@delete');

});
