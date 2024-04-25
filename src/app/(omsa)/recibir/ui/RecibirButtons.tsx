'use client'

import { ButtonCard } from "@/components";
import QrReader from "@/components/qr/QrReader";
import { useQrStore } from "@/store";
import { FaQrcode, FaUpload } from 'react-icons/fa';
import { FaPenToSquare, FaListUl } from 'react-icons/fa6';


export const RecibirBotones = () => {

    const isQrScannerOpen = useQrStore(state => state.isQrScannerOpen)
    const openQrScanner = useQrStore(state => state.openQrScanner)

    return (

        <div className="-mx-1">

            {
                isQrScannerOpen && <QrReader />
            }
            <div className="w-full">
                <div className="flex justify-between">

                    <ButtonCard
                        text={"Escanear QR"}
                        icon={<FaQrcode />}
                        action={openQrScanner}
                    />

                    <ButtonCard
                        text={"Subir foto de QR"}
                        icon={<FaUpload />}
                        action={() => { }}
                    />

                    <ButtonCard
                        text={"Subir foto de Remito"}
                        icon={<FaListUl />}
                        action={() => { }}
                    />

                    <ButtonCard
                        text={"Carga manual"}
                        icon={<FaPenToSquare />}
                        action={() => { }}
                    />

                </div>
            </div>

        </div>

    )
}
