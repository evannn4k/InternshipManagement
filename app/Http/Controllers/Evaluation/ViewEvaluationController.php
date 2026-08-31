<?php

namespace App\Http\Controllers\Evaluation;

use App\Http\Controllers\Controller;
use App\Http\Resources\EvaluationResource;
use App\Models\Evaluation;
use App\Models\Placement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ViewEvaluationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request)
    {
        Gate::authorize('evaluation:read');

        $search = $request->input('search');
        $filter = $request->input('filter');
        $key = $request->input('key');
        $availableKey = ['status'];

        if (! in_array($key, $availableKey)) {
            $key = '';
            $filter = '';
        }

        $data = Evaluation::hasRole(Auth::user())->with(['evaluator:id,name', 'placement:id,intern_id,program_id,position_title', 'placement.intern:id,name', 'placement.program:id,name'])->when($search, function ($query, $search) {
            return $query->where('name', 'like', "%$search%");
        })->when($filter, function ($query) use ($key, $filter) {
            return $query->where($key, $filter);
        })->orderByDesc('created_at')->paginate(10)->withQueryString();

        $placements = Placement::hasRole(Auth::user())->with(['intern:id,name', 'program:id,name'])->select('id', 'intern_id', 'mentor_id', 'program_id', 'status')->where('status', 'active')->get();

        $data = EvaluationResource::collection($data);

        return Inertia::render('Evaluation/EvaluationIndex', compact('data', 'placements'));
    }

    public function show(Evaluation $evaluation)
    {
        Gate::authorize('evaluation:read');

        return Inertia::render('Evaluation/EvaluationShow', compact('evaluation'));
    }
}
