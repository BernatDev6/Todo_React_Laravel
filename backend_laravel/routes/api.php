<?php

use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Route; 
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Api\NoteController;

// Ruta para iniciar sesión y obtener un token JWT
Route::post('login', [AuthController::class, 'login']);

// Ruta para registrar un nuevo usuario
Route::post('/register', [AuthController::class, 'register']);

// Grupo de rutas protegidas por JWT (solo accesibles para usuarios autenticados)
Route::middleware('jwt.auth')->group(function () { 

    // Ruta para obtener los datos del usuario autenticado
    Route::get('user', function (Request $request) { 
        return $request->user(); 
    }); 

    // Ruta para cerrar sesión (invalida el token JWT)
    Route::post('logout', [AuthController::class, 'logout']);

    // Rutas RESTful para gestionar notas (CRUD: Create, Read, Update, Delete)
    Route::apiResource('notes', NoteController::class);

    // Ruta para subir una imagen de perfil
    Route::post('/profile/upload', [ProfileController::class, 'uploadProfileImage']);

    // Ruta para obtener la imagen de perfil del usuario
    Route::get('/profile/image', [ProfileController::class, 'getProfileImage']);

});