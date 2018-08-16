<?php

namespace App\Http\Controllers;

use App\Guest;
use Illuminate\Http\Request;

class StatisticsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('statistics.index');
    }

    public function guests()
    {
        return Guest::all();
    }
}
