'use client';


import Link from "next/link";

interface Props {
    link: string,
    icon: any,
    text: string,
    isActive: boolean
}



export const TopMenuIcon = ({ link, icon, text, isActive }: Props) => {

    return (
        <Link href={link} passHref>
            <div
                className={`flex flex-col py-1 w-full lg:w-20 items-center transition duration-75 hover:text-black ${isActive ? "text-black" : "text-gray-400"}`}
                onClick={() => { }}
            >
                <div className="text-2xl">{icon}</div>
                <p className="hidden lg:inline text-sm">{text}</p>
                <div className={`${isActive ? "bg-black w-full h-px mt-1" : "hidden"}`}></div>

            </div>
        </Link>
    );
};