'use client'

import React from 'react'

interface Props {
    text: string,
    icon: any,
    action: any,
    smallText: string
}

export const ButtonCard = ({ text, icon, action, smallText }: Props) => {

    return (
        <a
            href="#"
            onClick={action}
            className="flex-1 p-2 mx-1 bg-white border border-gray-200 rounded-lg hover:bg-gray-200"
        >
            <p className="font-normal text-base text-gray-700 hidden sm:block">{icon}</p>
            <p className="font-normal text-xl text-gray-700 flex items-center justify-center sm:hidden">{icon}</p>
            <h5 className="mt-2 text-sm font-medium tracking-tight text-gray-900 hidden sm:block">{text}</h5>
            <h5 className="mt-2 text-sm font-medium tracking-tight text-gray-900 flex items-center justify-center sm:hidden">{smallText}</h5>
        </a>
    )
}
