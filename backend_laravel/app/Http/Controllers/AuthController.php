<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth; // Librería para manejo de tokens JWT 
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

/** 
 * Controlador para autenticación de usuarios. 
 * Proporciona métodos para login, registro y logout. 
 */
class AuthController extends Controller
{
    /** 
     * Método para iniciar sesión de un usuario y devolver un token JWT. 
     * 
     * @param Request $request 
     * @return \Illuminate\Http\JsonResponse 
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Credenciales inválidas'], 401);
        }

        return response()->json(['token' => $token]);
    }

    /** 
     * Método para cerrar sesión invalidando el token JWT. 
     * 
     * @param Request $request 
     * @return \Illuminate\Http\JsonResponse 
     */
    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json(['message' => 'Sesión cerrada correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al cerrar la sesión'], 500);
        }
    }

    /** 
     * Método para registrar un nuevo usuario. 
     * 
     * @param Request $request 
     * @return \Illuminate\Http\JsonResponse 
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }
}
