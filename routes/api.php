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
Route::group(['middleware' => ['web']], function () {
    Route::post('login','Auth\LoginController@login');  
    Route::post('register','Auth\RegisterController@register');  
    Route::post('logout','Auth\LoginController@logout');
    Route::post('password/email','Auth\ForgotPasswordController@sendResetLinkEmail'); 
    Route::post('password/reset','Auth\ResetPasswordController@reset');
       
});

/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'cors', 'prefix' => '/v1'], function () {
    Route::post('/login', 'Api\UserController@authenticate');
    Route::post('/register', 'Api\UserController@register');
    Route::get('/logout/{api_token}', 'Api\UserController@logout');
});
*/
