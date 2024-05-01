'use client'
import QrReader from "@/components/qr/QrReader";
import { useState } from "react";
import { FaTruck } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa6";

export default function MontarPage() {

    const [qrScannerOpen, setQrScannerOpen] = useState(false)

    return (
        <div className="flex flex-col items-center justify-start px-6">
            <div className="flex flex-col md:flex-row justify-center items-center">
                <a
                    href="#"
                    onClick={()=>setQrScannerOpen(!qrScannerOpen)}
                    className="block w-40 h-40 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mb-6 md:mb-0 md:mr-6"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        Recibir Módulos
                    </h5>
                    <p className="font-normal text-2xl text-gray-700">
                        <FaTruck />
                    </p>
                </a>
                <a
                    href="#"
                    className="block w-40 h-40 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        Montar Módulos
                    </h5>
                    <p className="font-normal text-2xl text-gray-700">
                        <FaBuilding />
                    </p>
                </a>
            </div>



        </div>
    );
}