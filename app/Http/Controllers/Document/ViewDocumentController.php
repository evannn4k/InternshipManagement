<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\Placement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ViewDocumentController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request)
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

        $data = Document::hasRole(Auth::user())->when($search, function ($query, $search) {
            return $query->where('name', 'like', "%$search%");
        })->when($filter, function ($query) use ($key, $filter) {
            return $query->where($key, $filter);
        })->orderByDesc('created_at')->paginate(10)->withQueryString();

        $placements = Placement::with(['intern:id,name', 'program:id,name'])->select('id', 'intern_id', 'mentor_id', 'program_id', 'status')->where("status", "active")->get();


        return Inertia::render('Document/DocumentIndex', compact('data', 'placements'));
    }

    public function show(Document $document)
    {
        Gate::authorize('document:read');

        return Inertia::render('Document/DocumentShow', compact('document'));
    }
}
