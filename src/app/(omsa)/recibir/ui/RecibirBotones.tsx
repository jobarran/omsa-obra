'use client'

import { RecibirMontarBotonCard } from "@/components"
import QrReader from "@/components/qr/QrReader";
import { useQrStore } from "@/store";
import { FaQrcode, FaUpload } from 'react-icons/fa';
import { FaPenToSquare } from 'react-icons/fa6';


export const RecibirBotones = () => {

    const isQrScannerOpen = useQrStore(state => state.isQrScannerOpen)
    const openQrScanner = useQrStore(state => state.openQrScanner)

    return (

        <div>

            {
                isQrScannerOpen && <QrReader/>
            }

            <div className="flex flex-col md:flex-row justify-center items-center">

                <RecibirMontarBotonCard
                    text={"Escanear QR"}
                    icon={<FaQrcode />}
                    action={openQrScanner}
                />

                <RecibirMontarBotonCard
                    text={"Subir foto de QR"}
                    icon={<FaUpload />}
                    action={()=>{} }
                />

                <RecibirMontarBotonCard
                    text={"Carga manual"}
                    icon={<FaPenToSquare />}
                    action={()=>{} }
                />

            </div>

        </div>

    )
}
