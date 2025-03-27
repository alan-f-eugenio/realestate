<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\PermissionsEnum;
use App\Enums\RolesEnum;
use App\Models\User;

final class UserPolicy {
    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model): bool {
        if (
            ! $user->hasPermissionTo(PermissionsEnum::USERS_ASSIGN_ROLE_MASTER)
            && $model->hasRole(RolesEnum::MASTER)
        ) {
            return false;
        }

        return $user->id !== $model->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model): bool {
        return $this->update($user, $model);
    }
}
