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

export const RecibirMontarBotonCard = ({ text, icon, action }: Props) => {

    return (
        <div className='p-4'>
            <a
                href="#"
                onClick={action}
                className="block w-40 h-40 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
            >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {text}
                </h5>
                <p className="font-normal text-2xl text-gray-700">
                    {icon}
                </p>
            </a>
        </div>
    )
}
