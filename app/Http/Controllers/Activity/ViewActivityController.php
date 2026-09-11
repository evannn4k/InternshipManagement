<?php

namespace App\Http\Controllers\Activity;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ViewActivityController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        Gate::authorize('document:read');

        $search = $request->input('search');
        $filter = $request->input('filter');
        $key = $request->input('key');
        $availableKey = ['status'];

        if (! in_array($key, $availableKey)) {
            $key = '';
            $filter = '';
        }

        $data = Activity::with(['user:id,name'])->when($search, function ($query, $search) {
            return $query->whereHas('user', function ($q) use ($search) {
                return $q->where("name", "like",  "%$search%");
            });
        })->when($filter, function ($query) use ($key, $filter) {
            return $query->where($key, $filter);
        })->orderByDesc('created_at')->paginate(10)->withQueryString();

        return Inertia::render('Activity/ActivityIndex', compact('data'));
    }
}
