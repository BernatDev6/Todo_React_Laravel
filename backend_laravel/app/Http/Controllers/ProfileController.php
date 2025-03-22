<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth; // Importamos JWTAuth para autenticación

class ProfileController extends Controller
{
    /**
     * Subir una nueva imagen de perfil
     */
    public function uploadProfileImage(Request $request)
    {
        // Obtener el usuario autenticado desde el token JWT
        $user = JWTAuth::parseToken()->authenticate();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Validar que la solicitud incluya una imagen válida
        $request->validate([
            'profile_image' => 'required|image|mimes:jpg,png,jpeg,gif|max:4096'
        ]);

        // Carpeta donde se almacenará la imagen (cada usuario tiene su propia carpeta)
        $userFolder = 'avatar/' . $user->id . '/';

        // Si el usuario ya tiene una imagen guardada, eliminarla antes de subir la nueva
        if ($user->profile_image) {
            Storage::disk('public')->delete($userFolder . $user->profile_image);
        }

        // Guardar la nueva imagen con un nombre único basado en el timestamp
        try {
            $imageName = time() . '.' . $request->file('profile_image')->getClientOriginalExtension();
            // Almacena la imagen en la carpeta específica del usuario ($userFolder) con el nombre definido ($imageName) en el disco público
            $request->file('profile_image')->storeAs($userFolder, $imageName, 'public');
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo cargar la imagen'], 500);
        }

        // Guardar el nombre de la imagen en la base de datos del usuario
        $user->profile_image = $imageName;
        $user->save();

        // Responder con un mensaje y la URL pública de la imagen
        return response()->json([
            'message' => 'Imagen del perfil actualizada!',
            'image' => asset("storage/$userFolder$imageName")
        ]);
    }

    /**
     * Obtener la URL de la imagen de perfil del usuario autenticado
     */
    public function getProfileImage()
    {
        // Obtener el usuario autenticado desde el token JWT
        $user = JWTAuth::parseToken()->authenticate();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Carpeta donde se almacena la imagen del usuario
        $userFolder = 'avatar/' . $user->id . '/';

        // Verificar si el usuario tiene una imagen de perfil almacenada
        if (!$user->profile_image || !Storage::disk('public')->exists($userFolder . $user->profile_image)) {
            return response()->json(['error' => 'No se ha encontrado la imagen'], 404);
        }

        // Devolver la URL pública de la imagen
        return response()->json([
            'profile_image' => asset("storage/$userFolder" . $user->profile_image)
        ]);
    }
}
