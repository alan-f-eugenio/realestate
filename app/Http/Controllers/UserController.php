<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Spatie\Permission\Models\Role;

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
            'roles' => Role::query()->select('name')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): void {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): InertiaResponse {
        Gate::authorize('update', $user);

        return Inertia::render('admin/users/user-create-edit', [
            'item' => [
                ...$user->toArray(),
                'role' => $user->roles->first()->name ?? null,
            ],
            'roles' => Role::query()->select('name')->get(),
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
        Gate::authorize('delete', $user);

        $user->delete();

        return back()->with('admin-flash', ['type' => 'success', 'text' => 'User deleted succesfully!']);
    }
}
