<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class ImageService
{
    public static function save($path, $file, $oldName = null)
    {
        if ($oldName) {
            Storage::delete("images/" . $path . $oldName);
        }

        $filename = time() . "-" . rand(000000, 999999) . "-" . $file->getClientOriginalName();
        $file->storeAs("images/" . $path, $filename);

        return $filename;
    }

    public static function destroy($path, $oldName)
    {
        Storage::delete("images/" . $path . $oldName);
    }
}
