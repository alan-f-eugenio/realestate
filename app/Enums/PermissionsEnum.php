<?php

declare(strict_types=1);

namespace App\Enums;

enum PermissionsEnum: string {
    case USERS_VIEW = 'users.view';
    case USERS_VIEW_ANY = 'users.viewAny';
    case USERS_CREATE = 'users.create';
    case USERS_STORE = 'users.store';
    case USERS_EDIT = 'users.edit';
    case USERS_UPDATE = 'users.update';
    case USERS_DESTROY = 'users.destroy';
    case USERS_ASSIGN_ROLE_MASTER = 'users.assignRole.master';
    case USERS_ALL = 'users.*';

    case PROPERTIES_VIEW = 'properties.view';
    case PROPERTIES_VIEW_ANY = 'properties.viewAny';
    case PROPERTIES_CREATE = 'properties.create';
    case PROPERTIES_STORE = 'properties.store';
    case PROPERTIES_EDIT = 'properties.edit';
    case PROPERTIES_UPDATE = 'properties.update';
    case PROPERTIES_DESTROY = 'properties.destroy';
    case PROPERTIES_ALL = 'properties.*';

    case SETTINGS_CREATE = 'settings.create';
    case SETTINGS_STORE = 'settings.store';
    case SETTINGS_EDIT = 'settings.edit';
    case SETTINGS_UPDATE = 'settings.update';
    case SETTINGS_ALL = 'settings.*';
}
