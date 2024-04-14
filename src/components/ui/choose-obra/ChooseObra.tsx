import React, { useState } from 'react'

export const ChooseObra = () => {


    return (
            <select
                id="small"
                className="block w-full p-2 mb-6 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            >
                <option selected>Elige una obra</option>
                <option value="US">Campos Salles</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
            </select>
    )
}
