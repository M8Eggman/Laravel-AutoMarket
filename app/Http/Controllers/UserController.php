<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Str;

class UserController extends Controller
{
    public function change_role(Request $request, $id)
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id',
        ], [], [
            'role_id' => 'rôle',
        ]);

        // Vérifie si l'utilisateur connecté est admin
        if (!Gate::allows('is-admin')) {
            return redirect()->back()->with('error', "Vous n'avez pas les droits !");
        }

        $user = User::findOrFail($id);

        // Ne pas changer le rôle d'un autre admin
        if ($user->role?->name === 'admin') {
            return redirect()->back()->with('error', "Impossible de modifier le rôle d'un administrateur !");
        }

        $user->role_id = $request->role_id;
        $user->save();

        return redirect()->back()->with('success', "Le rôle de {$user->first_name} a été modifié avec succès !");
    }

    public function destroy($id)
    {
        // Vérifie si l'user connecté est admin
        if (!Gate::allows('is-admin')) {
            return redirect()->route('home')
                ->with('error', "Vous n'avez pas les droits !");
        }

        $user = User::findOrFail($id);

        // Bloque la suppression d'un admin
        if ($user->role->name === 'admin') {
            return redirect()->back()
                ->with('error', "Impossible de supprimer un administrateur !");
        }

        if ($user->avatar && $user->avatar->path) {
            // enlève /storage/ du path puis supprime l'image
            $relativePath = str_replace('/storage/', '', $user->avatar->path);

            // vérifie que le fichier est bien dans users avant de le supprimer sinon ça supprimait l'image utilisé par le seeder
            if (Str::startsWith($relativePath, 'users/')) {
                Storage::disk('public')->delete($relativePath);
            }
            $user->avatar->delete();
        }

        // Supprimer l'utilisateur
        $user->delete();

        return redirect()->back()->with('success', 'Utilisateur supprimé avec succès.');
    }
}
