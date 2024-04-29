'use client'

import React from 'react'


export const SavedSuccessMessage = () => {


    return (
        <div className="text-sm bg-green-50 border border-green-100 text-green-800 w-full mb-2 px-4 py-2 rounded relative" role="alert">
            <strong className="font-bold">Guardado! </strong>
            <span className="block sm:inline">Se guardaron correctamente todos los materiales</span>
        </div>
    )
}