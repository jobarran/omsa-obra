'use client';


import Link from "next/link";
import { useState } from "react";

interface Props {
    link: string,
    icon: any,
    text: string,
}

export const TopMenuIcon = ({ link, icon, text }: Props) => {

    return (
        <Link href={link} passHref>
            <div
                className='flex flex-col py-1 w-full md:w-20 items-center transition duration-75 text-gray-400 hover:text-black'
                onClick={() => { }}
            >
                <div className="text-2xl">{icon}</div>
                <p className="hidden md:inline text-sm">{text}</p>
                <div className="w-full h-px mt-1 bg-gray-400"></div>

            </div>
        </Link>
    );
};