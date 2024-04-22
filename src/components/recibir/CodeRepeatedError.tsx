import React from 'react'

export const CodeRepeatedError = () => {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 w-full my-2 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Código repetido!</strong>
            <span className="block sm:inline">Ya existe un módulo con ese código.</span>
        </div>
    )
}
