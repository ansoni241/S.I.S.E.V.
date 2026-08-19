<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('users', function ($user) {
    return true;
});
Broadcast::channel('roles', function ($user) {
    return true;
});
