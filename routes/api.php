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
    Route::get('/', 'Api\ProductsController@index');
 
    Route::get('/{product}', 'Api\ProductsController@show');
    
    Route::post('/','Api\ProductsController@store');
    
    Route::put('/{product}','Api\ProductsController@update');
    
    Route::delete('/{product}', 'Api\ProductsController@delete');

});

Route::group(['prefix' => 'categories'], function(){

    Route::get('/', 'Api\CategoriesController@index');
 
    Route::get('/{category}', 'Api\CategoriesController@show');
    
    Route::post('/','Api\CategoriesController@store');
    
    Route::put('/{category}','Api\CategoriesController@update');
    
    Route::delete('/{category}', 'Api\CategoriesController@delete');

});

Route::group(['prefix' => 'owners'], function(){

    Route::get('/', 'Api\OwnersController@index');
 
    Route::get('/{owner}', 'Api\OwnersController@show');
    
    Route::post('/','Api\OwnersController@store');
    
    Route::put('/{owner}','Api\OwnersController@update');
    
    Route::delete('/{owner}', 'Api\OwnersController@delete');

});
