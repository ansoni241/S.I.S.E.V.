<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\User;
use App\Services\UserPresenceService;
use App\Services\UserService;

use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function __construct(
        private readonly UserService $userService,
        private readonly UserPresenceService $userPresenceService

    ) {}

    /**
     * Lista de usuarios.
     */
    // public function index(Request $request): Response
    // {
    //     $users = User::query()
    //         ->with('roles')
    //         ->when(
    //             $request->filled('search'),
    //             function ($query) use ($request) {
    //                 $search = $request->string('search');

    //                 $query->where(function ($query) use ($search) {
    //                     $query
    //                         ->where('name', 'like', "%{$search}%")
    //                         ->orWhere('email', 'like', "%{$search}%");
    //                 });
    //             }
    //         )
    //         ->when(
    //             $request->filled('status'),
    //             fn($query) => $query->where(
    //                 'status',
    //                 $request->string('status')
    //             )
    //         )
    //         ->latest()
    //         ->paginate(15)
    //         ->withQueryString();

    //     return Inertia::render('users/index', [
    //         'users' => $users,
    //         'filters' => [
    //             'search' => $request->input('search', ''),
    //             'status' => $request->input('status', ''),
    //         ],
    //     ]);
    // }

    public function index(Request $request): Response
    {
        $users = User::query()
            ->with('roles')
            ->when(
                $request->filled('search'),
                function ($query) use ($request) {
                    $search = $request->string('search');

                    $query->where(function ($query) use ($search) {
                        $query
                            ->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
                }
            )
            ->when(
                $request->filled('status'),
                fn($query) => $query->where(
                    'status',
                    $request->string('status')
                )
            )
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $users->getCollection()->transform(function (User $user) {
            $user->presence = $this->userPresenceService->getPresence($user);

            return $user;
        });

        return Inertia::render('users/index', [
            'users' => $users,
            'filters' => [
                'search' => $request->input('search', ''),
                'status' => $request->input('status', ''),
            ],
        ]);
    }

    /**
     * Formulario de creación.
     */
    public function create(): Response
    {
        return Inertia::render('users/create', [
            'roles' => Role::query()
                ->where('name', '!=', 'Developer')
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }
    /**
     * Guardar usuario.
     */
    public function store(StoreUserRequest $request)
    {
        $this->userService->create($request->validated());

        return to_route('users.index')
            ->with('success', 'Usuario creado correctamente.');
    }

    /**
     * Mostrar usuario.
     */
    public function show(User $user): Response
    {
        $user->load('roles', 'permissions');

        return Inertia::render('users/show', [
            'user' => $user,
        ]);
    }

    /**
     * Formulario de edición.
     */
    public function edit(User $user): Response
    {
        $user->load('roles');

        return Inertia::render('users/edit', [
            'user' => $user,
            'roles' => Role::query()
                ->where('name', '!=', 'Developer')
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    /**
     * Actualizar usuario.
     */
    public function update(
        UpdateUserRequest $request,
        User $user
    ) {
        $this->userService->update(
            $user,
            $request->validated()
        );

        return to_route('users.index')
            ->with('success', 'Usuario actualizado correctamente.');
    }

    /**
     * Eliminar usuario.
     */
    public function destroy(User $user)
    {
        $this->userService->delete($user);

        return to_route('users.index')
            ->with('success', 'Usuario eliminado correctamente.');
    }
}
