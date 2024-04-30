'use client'

import { ButtonCard, ButtonCardUploadRemito, ManualAddMaterial, ReturnMaterialModal } from "@/components";
import QrReader from "@/components/qr/QrReader";
import { useMaterialStore, useQrStore } from "@/store";
import { useState } from "react";
import { FaQrcode, FaUpload } from 'react-icons/fa';
import { FaPenToSquare, FaListUl, FaArrowRightArrowLeft } from 'react-icons/fa6';


export const RecibirBotones = () => {

    const [returnModal, setReturnModal] = useState(false)
    const [addModal, setAddModal] = useState(false)

    const isQrScannerOpen = useQrStore(state => state.isQrScannerOpen)
    const openQrScanner = useQrStore(state => state.openQrScanner)
    const setIsAddMaterialManuallyModal = useMaterialStore(state => state.setIsAddMaterialManuallyModal)
    const isAddMaterialManuallyModal = useMaterialStore(state => state.isAddMaterialManuallyModal)


    return (

        <div className="-mx-1">

            {
                isQrScannerOpen && <QrReader />
            }
            {
                isAddMaterialManuallyModal && <ManualAddMaterial />
            }
            {
                returnModal && <ReturnMaterialModal
                    returnModal={returnModal}
                    setReturnModal={()=>setReturnModal(!returnModal)}
                />
            }

            <div className="w-full">
                <div className="flex justify-between">

                    <ButtonCard
                        text={"Escanear QR"}
                        icon={<FaQrcode />}
                        action={openQrScanner}
                    />

                    <ButtonCardUploadRemito
                        text={"Subir foto de Remito"}
                        icon={<FaListUl />}
                        action={() => { }}
                    />

                    <ButtonCard
                        text={"Carga manual"}
                        icon={<FaPenToSquare />}
                        action={setIsAddMaterialManuallyModal}
                    />

                    <ButtonCard
                        text={"Devolver material"}
                        icon={<FaArrowRightArrowLeft />}
                        action={() => setReturnModal(true)}
                    />

                </div>

            </div>

        </div>

    )
}
