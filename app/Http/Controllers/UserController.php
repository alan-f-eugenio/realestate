<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

final class UserController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index(): InertiaResponse {
        $users = User::query()
            ->select('id', 'name', 'email', 'created_at', 'updated_at')
            ->paginate(20);

        return Inertia::render('admin/users/user-index', [
            'paginatedResponse' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): InertiaResponse {
        return Inertia::render('admin/users/user-create-edit', [
            'item' => new User(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): void {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): void {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): InertiaResponse {
        return Inertia::render('admin/users/user-create-edit', [
            'item' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user): void {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse {
        $user->delete();

        return back()->with('admin-flash', ['type' => 'success', 'text' => 'User deleted succesfully!']);
    }
}
