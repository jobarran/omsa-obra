'use client'

import { ButtonCard, ButtonCardUploadRemito } from "@/components";
import QrReader from "@/components/qr/QrReader";
import useTextRecognition from "@/hooks/useTextRecognition";
import { useMaterialStore, useQrStore } from "@/store";
import { qrScannerToObjectArray } from "@/utils";
import { ChangeEvent, useEffect } from "react";
import { FaQrcode, FaUpload } from 'react-icons/fa';
import { FaPenToSquare, FaListUl } from 'react-icons/fa6';


export const RecibirBotones = () => {

    const isQrScannerOpen = useQrStore(state => state.isQrScannerOpen)
    const openQrScanner = useQrStore(state => state.openQrScanner)
    const setStoreMaterial = useMaterialStore(state => state.setStoreMaterial)

    const { recognizedMaterials, isLoading, handleImageUpload } = useTextRecognition();

    useEffect(() => {
        if (!isLoading && recognizedMaterials.length > 0) {
            setStoreMaterial(recognizedMaterials);
        }
    }, [recognizedMaterials, isLoading, setStoreMaterial]);

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0];
            handleImageUpload(image);
        }
    };

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

                    <ButtonCardUploadRemito
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
                {/* 
                <div>
                    <input type="file" accept="image/*" onChange={onFileChange} />
                    {isLoading && <div>Loading...</div>}
                    <ul>
                        {recognizedText.map((text, index) => (
                            <li key={index}>{text}</li>
                        ))}
                    </ul>
                </div> */}

            </div>

        </div>

    )
}
