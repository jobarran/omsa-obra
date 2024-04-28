'use client'

import { useMaterialStore } from '@/store'
import React from 'react'


export const CodeRepeatedError = () => {

    const errorMessage = useMaterialStore(state => state.errorMessage)

    return (
        <div className="text-sm bg-red-50 border border-red-100 text-red-800 w-full mb-2 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{errorMessage}</span>
        </div>
    )
}


