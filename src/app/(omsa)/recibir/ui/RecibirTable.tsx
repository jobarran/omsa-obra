'use client'

import { useQrStore } from "@/store"
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from 'react';
import { CodeRepeatedError, DatePicker, EmptyTable, RecibirTableBody, SaveButton } from "@/components";
import { getTodayDate, qrToRecibir } from "@/utils";
import { createMaterials } from "@/actions";



export const RecibirTable = () => {

  const isScannedQrRepeated = useQrStore(state => state.isScannedQrRepeated)
  const emptyScannedQr = useQrStore(state => state.emptyScannedQr)
  const scannedQr = useQrStore(state => state.scannedQr)

  useEffect(() => {
    emptyScannedQr()
  }, [])

  const [value, setValue] = useState({
    startDate: getTodayDate(),
    endDate: getTodayDate()
  });

  const handleSaveMaterials = async () => {

    //TODO: validar dusplicados antes de guardar

    if (scannedQr) {
        const materials = qrToRecibir(scannedQr, value.startDate);
        console.log(materials);
        await createMaterials(materials); // Wait for createMaterials to finish
    }
};

  return (

    <div className="flex flex-col justify-centerr">

      <DatePicker
        value={value}
        setValue={setValue}
      />

      {
        isScannedQrRepeated && <CodeRepeatedError />
      }

      <RecibirTableBody />

      <div className="flex w-full mt-2">
        <SaveButton handleSaveMaterials={() => handleSaveMaterials()} />
        <EmptyTable />
      </div>

    </div>
  )
}