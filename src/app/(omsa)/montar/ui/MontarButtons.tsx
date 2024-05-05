'use client'

import { ButtonCard, ButtonCardUploadRemito, ManualAddMaterial, ReturnMaterialModal } from '@/components';
import { useState } from "react";
import { FaQrcode } from 'react-icons/fa';
import { FaPenToSquare, FaArrowRightArrowLeft } from 'react-icons/fa6';
import { FaCamera } from "react-icons/fa";
import QrReader from '@/components/qr/QrReader';
import MontarQrReader from '@/components/qr/MontarQrReader';


export const MontarBotones = () => {

    const [returnModal, setReturnModal] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [qrReader, setQrReader] = useState(false)

    
    return (

        <div className="-mx-1">

            {
                qrReader && 
                <MontarQrReader
                    qrReader={qrReader}
                    setQrReader={()=>setQrReader(!qrReader)}
                    handleMontarMaterialChange={()=>{}}
                />
            }
            {
                addModal &&
                <ManualAddMaterial
                    addModal={addModal}
                    setAddModal={() => setAddModal(!addModal)}
                />
            }
            {
                returnModal &&
                <ReturnMaterialModal
                    returnModal={returnModal}
                    setReturnModal={() => setReturnModal(!returnModal)}
                />
            }

            <div className="w-full">
                <div className="flex justify-between">

                    <ButtonCard
                        text={"Escanear QR"}
                        smallText={'QR'}
                        icon={<FaQrcode />}
                        action={setQrReader}
                    />

                    <ButtonCardUploadRemito
                        text={"Foto de Etiqueta"}
                        smallText={'Foto'}
                        icon={<FaCamera />}
                        action={() => { }}
                    />

                    <ButtonCard
                        text={"Carga manual"}
                        smallText={'Manual'}
                        icon={<FaPenToSquare />}
                        action={setAddModal}
                    />

                    <ButtonCard
                        text={"Informe de reposición"}
                        smallText={'IRCO'}
                        icon={<FaArrowRightArrowLeft />}
                        action={setReturnModal}
                    />

                </div>

            </div>

        </div>

    )
}
