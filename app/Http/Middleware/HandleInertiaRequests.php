<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'auth' => [
                "name" => $request->user()->name ?? "",
                "email" => $request->user()->email ?? "",
                "phone" => $request->user()->phone ?? "",
                "avatar" => $request->user()->avatar ?? "",
                "role" => $request->user()->role->name ?? "",
                "email_verified_at" => $request->user()->email_verified_at ?? "",
                "last_login_at" => $request->user()->last_login_at ?? "",
                "fcm_token" => $request->user()->fcm_token ?? "",
                "is_active" => $request->user()->is_active ?? false,
                "school" => $request->user()->school->name ?? "",
                "created_at" => $request->user()->created_at ?? "",
                "permission" => $request->user() ? $request->user()->getAllPermission() : ""
            ]
        ]);
    }
}
