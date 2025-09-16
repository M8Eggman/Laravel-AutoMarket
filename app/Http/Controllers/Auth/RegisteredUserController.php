<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Avatar;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Str;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'avatar' => ['nullable', 'image', 'max:5120'],
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => Role::where("name", 'user')->first()->id,
        ]);

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');

            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $fileName = date('Y_m_d_His') . '_' . uniqid() . '_' . Str::slug($originalName) . '.' . $file->getClientOriginalExtension();

            $filePath = $file->storeAs('avatars', $fileName, 'public');

            $avatar = new Avatar([
                'path' => '/storage/' . $filePath
            ]);
            
            $user->avatar()->save($avatar);
        }

        event(new Registered($user));
        Auth::login($user);

        return redirect()->intended();
    }
}
