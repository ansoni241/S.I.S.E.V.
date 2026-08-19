<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreRoleRequest;
use App\Http\Requests\Admin\UpdateRoleRequest;
use App\Services\RoleService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function __construct(
        private readonly RoleService $roleService
    ) {}

    /**
     * Lista de roles.
     */
    public function index(Request $request): Response
    {
        $roles = Role::query()
            ->with('permissions')
            ->withCount('users')
            ->when(
                $request->filled('search'),
                function ($query) use ($request) {
                    $search = $request->string('search');

                    $query->where(
                        'name',
                        'like',
                        "%{$search}%"
                    );
                }
            )
            ->orderBy('name')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('roles/index', [
            'roles' => $roles,

            'filters' => [
                'search' => $request->input('search', ''),
            ],
        ]);
    }

    /**
     * Formulario de creación.
     */
    public function create(): Response
    {
        return Inertia::render('roles/create', [
            'permissions' => Permission::query()
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    /**
     * Guardar rol.
     */
    public function store(StoreRoleRequest $request)
    {
        $this->roleService->create(
            $request->validated()
        );

        return to_route('roles.index')
            ->with('success', 'Rol creado correctamente.');
    }

    /**
     * Mostrar rol.
     */
    public function show(Role $role): Response
    {
        $role->load('permissions');

        return Inertia::render('roles/show', [
            'role' => $role,
        ]);
    }

    /**
     * Formulario de edición.
     */
    public function edit(Role $role): Response
    {
        $role->load('permissions');

        return Inertia::render('roles/edit', [
            'role' => $role,
            'permissions' => Permission::query()
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    /**
     * Actualizar rol.
     */
    public function update(
        UpdateRoleRequest $request,
        Role $role
    ) {
        $this->roleService->update(
            $role,
            $request->validated()
        );

        return to_route('roles.index')
            ->with('success', 'Rol actualizado correctamente.');
    }

    /**
     * Eliminar rol.
     */
    public function destroy(Role $role)
    {
        $this->roleService->delete($role);

        return to_route('roles.index')
            ->with('success', 'Rol eliminado correctamente.');
    }
}
