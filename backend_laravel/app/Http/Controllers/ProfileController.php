<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProfileController extends Controller
{
    public function uploadProfileImage(Request $request)
    {
        // Validar que el usuario esté autenticado
        if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Validar la imagen recibida
        $request->validate([
            'profile_image' => 'required|image|mimes:jpg,png,jpeg,gif|max:2048'
        ]);

        // Carpeta específica para el usuario
        $userFolder = 'profile_images/' . $user->id . '/';

        // Eliminar la imagen anterior si existe
        if ($user->profile_image && Storage::exists($userFolder . $user->profile_image)) {
            Storage::delete($userFolder . $user->profile_image);
        }

        // Guardar la nueva imagen
        try {
            $imageName = time() . '.' . $request->profile_image->getClientOriginalExtension();
            $request->profile_image->storeAs($userFolder, $imageName); // Guardar en la carpeta del usuario
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to upload image'], 500);
        }

        // Guardar la ruta en la base de datos
        $user->profile_image = $imageName;
        $user->save();

        return response()->json([
            'message' => 'Profile image updated!',
            'image' => Storage::url($userFolder . $imageName) // Generar URL pública
        ]);
    }

    public function getProfileImage()
    {
        // Validar que el usuario esté autenticado
        if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Carpeta específica del usuario
        $userFolder = 'profile_images/' . $user->id . '/';

        // Verificar si la imagen existe
        if (!$user->profile_image || !Storage::exists($userFolder . $user->profile_image)) {
            return response()->json(['error' => 'Image not found'], 404);
        }

        // Devolver la URL pública de la imagen
        return response()->json([
            'profile_image' => Storage::url($userFolder . $user->profile_image)
        ]);
    }
}
