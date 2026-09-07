<?php

namespace App\Http\Controllers;

use App\Notifications\FcmNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TestingController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request)
    {
        return redirect()->intended('/login');
    }
}
