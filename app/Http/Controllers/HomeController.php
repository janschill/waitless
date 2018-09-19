<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $version = config('app.version');

        return view('home.index', compact('version'));
    }
}
