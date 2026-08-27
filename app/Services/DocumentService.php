<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DocumentService
{
    public static function save($file, $oldName = null)
    {
        if ($oldName) {
            Storage::delete('document/'.$oldName);
        }

        $filename = time().'-'.Str::random(20).'-'.rand(000000, 999999).'-'.$file->getClientOriginalExtension();
        $file->storeAs('document/', $filename);

        return $filename;
    }
    
    public static function destroy($oldName)
    {
        Storage::delete('document/'.$oldName);
    }
}
