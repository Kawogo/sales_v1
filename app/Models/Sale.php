<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_id',
        'sale_id',
        'sale_qty',
        'sale_discount',
        'sale_total',
    ];

    public function product(){
        return $this->belongsTo(Product::class,'item_id');
    }
}
