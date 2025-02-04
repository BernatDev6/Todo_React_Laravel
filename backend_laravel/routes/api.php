<?php

use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Route; 
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\NoteController;
 
Route::post('login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
 
Route::middleware('jwt.auth')->group(function () { 
 
    Route::get('user', function (Request $request) { 
        return $request->user(); 
    }); 
 
    Route::post('logout', [AuthController::class, 'logout']);

    Route::apiResource('notes', NoteController::class);

}); 