<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Waitid;

class WaitidsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Waitid $waitid)
    {
        $enabledWaitids = Waitid::enabled()
            ->orderBy('number', 'asc')
            ->get();
        $disabledWaitids = Waitid::disabled()
            ->orderBy('number', 'asc')
            ->get();
        $currentlyUsed  = $waitid->guests;
        return view('waitids.index', compact('enabledWaitids', 'disabledWaitids', 'currentlyUsed'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('waitids.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate(request(), [
            'waitid_number' => 'required|unique:waitids,number'
        ]);

        Waitid::create([
            'number' => request('waitid_number'),
        ]);

        return redirect('/waitids');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $waitid = Waitid::findOrFail($id);
        $waitid->disabled = $waitid->disabled == 0 ? 1 : 0;
        $waitid->save();

        return redirect()->action('WaitidsController@index');
    }
}
