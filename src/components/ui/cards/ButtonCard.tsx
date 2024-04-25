'use client'

import React from 'react'

interface Props {
    text: string,
    icon: any,
    action: any
}

export const ButtonCard = ({ text, icon, action }: Props) => {

    return (
        <a
            href="#"
            onClick={action}
            className="flex-1 p-2 mx-1 bg-white border border-gray-200 rounded-lg hover:bg-gray-200"
        >
            <p className="font-normal text-base text-gray-700">
                {icon}
            </p>

            <h5 className="mt-2 text-sm font-medium tracking-tight text-gray-900">
                {text}
            </h5>
        </a>
    )
}
