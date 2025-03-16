<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\PermissionsEnum;
use App\Enums\RolesEnum;
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

        foreach (PermissionsEnum::cases() as $permissionsEnum) {
            Permission::create(['name' => $permissionsEnum->value]);
        }

        $admin = Role::create(['name' => RolesEnum::ADMIN->value]);
        $admin->givePermissionTo(PermissionsEnum::USERS_VIEW_ANY->value);
        $admin->givePermissionTo(PermissionsEnum::USERS_CREATE->value);
        $admin->givePermissionTo(PermissionsEnum::USERS_STORE->value);
        $admin->givePermissionTo(PermissionsEnum::USERS_EDIT->value);
        $admin->givePermissionTo(PermissionsEnum::USERS_UPDATE->value);
        $admin->givePermissionTo(PermissionsEnum::PROPERTIES_ALL->value);
        $admin->givePermissionTo(PermissionsEnum::SETTINGS_ALL->value);

        $master = Role::create(['name' => RolesEnum::MASTER->value]);
        $master->givePermissionTo(PermissionsEnum::USERS_ALL->value);
        $master->givePermissionTo(PermissionsEnum::PROPERTIES_ALL->value);
        $master->givePermissionTo(PermissionsEnum::SETTINGS_ALL->value);

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
