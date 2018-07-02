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

//Route::resource('products', 'Api\ProductController');

Route::group(['prefix' => 'products'],function() {
    Route::get('/', 'Api\ProductController@index');
    Route::get('/paged', 'Api\ProductController@pagedIndex');
    Route::get('/pagedOwner/{owner}', 'Api\ProductController@pagedIndexByOwner');
    Route::get('/{id}', 'Api\ProductController@show');
    Route::post('/', 'Api\ProductController@store');
    Route::put('/{id}', 'Api\ProductController@update');
    Route::delete('/{id}', 'Api\ProductController@destroy');
});