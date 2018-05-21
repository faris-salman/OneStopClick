<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use App\Http\Requests;
use JWTAuth;
use Response;
use App\Repository\Transformers\UserTransformer;
use \Illuminate\Http\Response as HttpResponse;
use Validator;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends ApiController
{
    protected $userTransformer;

    public function __construct(userTransformer $userTransformer)
    {
        $this->userTransformer = $userTransformer;
    }

    public function authenticate(Request $request)
    {
        $rules = array (
            'email' => 'required|email',
            'password' => 'required',
        );

        $validator = Validator::make($request->all(), $rules);

        if ($validator-> fails()){
            return $this->responseValidationError('Fields Validation Failed.', $validator->errors());
        }

        else{
            $user = User::where('email', $request['email'])->first();

            if($user){
                $api_token = $user->api_token;

                if ($api_token == NULL){
                    return $this->_login($request['email'], $request['password']);
                }

                try{
                    $user = JWTAuth::toUser($api_token);

                    return $this->response([
                        'status' => 'success',
                        'status_code' => $this->getStatusCode(),
                        'message' => 'Already logged in',
                        'user' => $this->userTransformer->transform($user)
                    ]);

                }catch(JWTException $e){
                    $user->api_token = NULL;
                    $user->save();

                    return $this->responseInternalError("Login Unsuccessful. An error occurred while performing an action!");
                }
            }
            else{
                return $this->responseWithError("Invalid Email or Password");
            }
        }
    }

    private function _login($email, $password)
    {
        $credentials = ['email' => $email, 'password' => $password];

        if ( ! $token = JWTAuth::attempt($credentials)) {
            return $this->responseWithError("User does not exist!");
        }

        $user = JWTAuth::toUser($token);
        $user->api_token = $token;
        $user->save();

        return $this->response([
            'status' => 'success',
            'status_code' => $this->getStatusCode(),
            'message' => 'Login successful!',
            'data' => $this->userTransformer->transform($user)
        ]);
    }

    public function register(Request $request)
    {
        $rules = array (
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|min:3'
        );

        $validator = Validator::make($request->all(), $rules);

        if ($validator-> fails()){
            return $this->responseValidationError('Fields Validation Failed.', $validator->errors());
        }

        else{
            $user = User::create([
                'name' => $request['name'],
                'email' => $request['email'],
                'password' => \Hash::make($request['password']),
            ]);

            return $this->_login($request['email'], $request['password']);
        }
    }

    public function logout($api_token)
    {
        try{
            $user = JWTAuth::toUser($api_token);
            $user->api_token = 'NULL';
            $user->save();

            JWTAuth::setToken($api_token)->invalidate();

            $this->setStatusCode(HttpResponse::HTTP_OK);

            return $this->response([
                'status'=>'success',
                'status_code'=>$this->getStatusCode(),
                'message'=>'Logout successful!'
            ]);
        } catch(JWTException $e){
            return $this->responseInternalError("An error occured while performing an action!");
        }
    }
}
