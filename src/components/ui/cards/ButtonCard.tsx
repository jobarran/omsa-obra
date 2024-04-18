'use client'

import React from 'react'

interface Props {
    text: string,
    icon: any,
    action: any
}

//TODO: Agregar qr-scanner upload img
//TODO: Agregar modal Carga manual
//TODO: Traducir todo a ingles

export const ButtonCard = ({ text, icon, action }: Props) => {

    return (
        <div className='p-2'>
            <a
                href="#"
                onClick={action}
                className="block w-20 h-20 p-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
            >
                <h5 className="text-base font-semibold tracking-tight text-gray-900">
                    {text}
                </h5>
                <p className="font-normal text-lg text-gray-700">
                    {icon}
                </p>
            </a>
        </div>
    )
}
