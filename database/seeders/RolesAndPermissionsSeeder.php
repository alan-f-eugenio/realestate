<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

final class RolesAndPermissionsSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create(['name' => 'users.view']);
        Permission::create(['name' => 'users.viewAny']);
        Permission::create(['name' => 'users.create']);
        Permission::create(['name' => 'users.store']);
        Permission::create(['name' => 'users.edit']);
        Permission::create(['name' => 'users.update']);
        Permission::create(['name' => 'users.destroy']);
        Permission::create(['name' => 'users.assignRole.master']);
        Permission::create(['name' => 'users.*']);

        Permission::create(['name' => 'properties.view']);
        Permission::create(['name' => 'properties.viewAny']);
        Permission::create(['name' => 'properties.create']);
        Permission::create(['name' => 'properties.store']);
        Permission::create(['name' => 'properties.edit']);
        Permission::create(['name' => 'properties.update']);
        Permission::create(['name' => 'properties.destroy']);
        Permission::create(['name' => 'properties.*']);

        Permission::create(['name' => 'settings.create']);
        Permission::create(['name' => 'settings.store']);
        Permission::create(['name' => 'settings.edit']);
        Permission::create(['name' => 'settings.update']);
        Permission::create(['name' => 'settings.*']);

        // create roles and assign existing permissions
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo('users.view');
        $admin->givePermissionTo('users.viewAny');
        $admin->givePermissionTo('users.create');
        $admin->givePermissionTo('users.store');
        $admin->givePermissionTo('users.edit');
        $admin->givePermissionTo('users.update');
        $admin->givePermissionTo('users.destroy');
        $admin->givePermissionTo('properties.*');
        $admin->givePermissionTo('settings.*');

        $master = Role::create(['name' => 'master']);
        $master->givePermissionTo('users.*');
        $master->givePermissionTo('properties.*');
        $master->givePermissionTo('settings.*');
        // gets all permissions via Gate::before rule; see AuthServiceProvider

        // create demo users
        $user = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@user.com',
        ]);
        $user->assignRole($admin);

        $user = User::factory()->create([
            'name' => 'Master',
            'email' => 'master@user.com',
        ]);
        $user->assignRole($master);
    }
}
