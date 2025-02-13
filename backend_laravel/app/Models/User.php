<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_image',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /** 
     * Devuelve el identificador que será almacenado en el token JWT. 
     * 
     * @return mixed 
     */
    public function getJWTIdentifier()
    {
        return $this->getKey(); // Retorna el id del usuario 
    }

    /** 
     * Devuelve un arreglo de claims personalizados para el token JWT. 
     * 
     * @return array<string, mixed> 
     */
    public function getJWTCustomClaims()
    {
        return []; // Por defecto no añade claims personalizados 
    }

    /**
     * Define una relación de uno a muchos entre el modelo User y Note.
     * Un usuario puede tener varias notas asociadas.
     */
    public function notes()
    {
        // La función hasMany establece que el modelo User puede tener muchas instancias de Note.
        // Laravel asume automáticamente lo siguiente:
        // - La tabla relacionada es 'notes' (plural del modelo Note).
        // - La clave foránea es 'user_id' en la tabla 'notes'.
        // - La clave primaria del modelo User es 'id'.
        return $this->hasMany(Note::class);
    }
}
