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

    public function guests($year = null, $month = null, $day = null)
    {
        if (isset($day)) {
            $guests = Guest::whereDay('arrival_time', '=', $day)
                           ->whereMonth('arrival_time', '=', $month)
                           ->whereYear('arrival_time', '=', $year)->get();
        } else if (isset($month)) {
            $guests = Guest::whereMonth('arrival_time', '=', $month)
                           ->whereYear('arrival_time', '=', $year)->get();
        } else if (isset($year)) {
            $guests = Guest::whereYear('arrival_time', '=', $year)->get();
        }

        return $guests;
    }
}
