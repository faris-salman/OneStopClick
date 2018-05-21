<?php

namespace App\Http\Controllers\Api;

use Illuminate\Pagination\LengthAwarePaginator as Paginator;
use Response;
use \Illuminate\Http\Response as HttpResponse;

class ApiController extends \App\Http\Controllers\Controller
{
    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->beforeFilter('auth', ['on' => 'post']);
    }

    /**
     * @var int
     */
    protected $statusCode = HttpResponse::HTTP_OK;

    /**
     * @return mixed
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    /**
     * @param $message
     * @return json response
     */
    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;

        return $this;
    }


    public function responseCreated($message, $data=null){

        return $this->response([

            'status' => 'success',
            'status_code' => HttpResponse::HTTP_CREATED,
            'message' => $message,
            'data' => $data

        ]);

    }


    /**
     * @param Paginator $paginate
     * @param $data
     * @return mixed
     */
    protected function responseWithPagination(Paginator $paginate, $data, $message){

        $data = array_merge($data, [
            'paginator' => [
                'total_count'  => $paginate->total(),
                'total_pages' => ceil($paginate->total() / $paginate->perPage()),
                'current_page' => $paginate->currentPage(),
                'limit' => $paginate->perPage(),
            ]
        ]);

        return $this->response([

            'status' => 'success',
            'status_code' => HttpResponse::HTTP_OK,
            'message' => $message,
            'data' => $data

        ]);
    }


    public function responseNotFound($message = 'Not Found!'){

        return $this->response([

            'status' => 'error',
            'status_code' => HttpResponse::HTTP_NOT_FOUND,
            'message' => $message,

        ]);

    }


    public function responseInternalError($message){

        return $this->response([

            'status' => 'error',
            'status_code' => HttpResponse::HTTP_INTERNAL_SERVER_ERROR,
            'message' => $message,

        ]);

    }

    public function responseValidationError($message, $errors){

        return $this->response([

            'status' => 'error',
            'status_code' => HttpResponse::HTTP_UNPROCESSABLE_ENTITY,
            'message' => $message,
            'data' => $errors

        ]);

    }

    public function response($data, $headers = []){

        return Response::json($data, $this->getStatusCode(), $headers);

    }

    public function responseWithError($message){
        return $this->response([

            'status' => 'error',
            'status_code' => HttpResponse::HTTP_UNAUTHORIZED,
            'message' => $message,

        ]);
    }
}
