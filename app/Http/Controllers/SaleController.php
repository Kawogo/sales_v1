<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Sale/Index',[
            'sales' => Sale::with('product')->get()->all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
       return Inertia::render('Sale/Create', ['products' => Product::query()->get()->all()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $validator = Validator::make($request->all(), [
        //     'formFields.*.item_id' => 'required|numeric',
        //     'formFields.*.sale_qty' => 'required|numeric',
        //     'formFields.*.sale_discount' => 'required|numeric',
        //     'formFields.*.sale_total' => 'required|numeric',
        //     'formFields.*.price' => 'required|numeric',
        // ]);
        
        // if ($validator->fails()) {
        //     $errors = $validator->errors();
        //     return $errors;
        // }

        $data = $request->input('cartItems');

        // dd($data[0]['sale_id']);
        $sale[0]['sale_id'] = uniqid();

        foreach ($data as $sale) {
            # code...
            Sale::create($sale);
        }

        return Redirect::route('sale.index')->with('message', 'Sale added successfully!');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function show(Sale $sale)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function edit(Sale $sale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sale $sale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sale $sale)
    {
        //
    }
}
