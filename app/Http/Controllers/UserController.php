<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function destroy($id)
    {
        // Vérifier si l'utilisateur connecté est admin
        if (!auth()->user() || auth()->user()->role->name !== 'admin') {
            abort(403, 'Accès interdit');
        }

        $user = User::findOrFail($id);

        // Supprimer l'image de profil si elle existe
        if ($user->avatar && $user->avatar->path) {
            Storage::delete($user->avatar->path);
            $user->avatar->delete(); // si tu as un modèle Avatar lié
        }

        // Supprimer l'utilisateur
        $user->delete();

        return redirect()->back()->with('success', 'Utilisateur supprimé avec succès.');
    }
}
