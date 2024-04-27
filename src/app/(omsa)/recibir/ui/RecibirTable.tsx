'use client'

import { useMaterialStore, useQrStore, useUiStore } from "@/store"
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from 'react';
import { CodeRepeatedError, DatePicker, EmptyTable, RecibirTableBody, SaveButton } from "@/components";
import { getTodayDate, qrToRecibir } from "@/utils";
import { createMaterials, getMaterialsByProject } from "@/actions";
import { Material } from "@/interfaces";



export const RecibirTable = () => {

  const [duplicatedCodes, setDuplicatedCodes] = useState<string[]>([]); // State variable to store duplicated codes

  const isScannedQrRepeated = useQrStore(state => state.isScannedQrRepeated)
  const emptyScannedQr = useQrStore(state => state.emptyScannedQr)
  const scannedQr = useQrStore(state => state.scannedQr)
  const activeProject = useUiStore(state => state.activeProject)
  const storeMaterial = useMaterialStore(state => state.storeMaterial)
  const emptyStoreMaterial = useMaterialStore(state => state.emptyStoreMaterial)

  useEffect(() => {
    emptyScannedQr()
  }, [])

  const [value, setValue] = useState({
    startDate: getTodayDate(),
    endDate: getTodayDate()
  });

  const handleSaveMaterials = async () => {
    if (storeMaterial) {
      const { materials } = await getMaterialsByProject(activeProject?.code);
      const materialCodes = new Set(materials?.map(material => material.code)); // Extract material codes from stored materials
      const duplicates = storeMaterial.filter(material => materialCodes.has(material.code)); // Filter storeMaterial for duplicates

      if (duplicates.length > 0) {
        //todo: CARTEL: CODIGOS DUPLICADOS. YA RECIBISTE ESTE MATERIAL
        //todo: IF CODE AND NAME AND PROJECT ID ARE DUPLICATED
        // If duplicates are found, extract the codes and update the state variable
        const duplicatedCodesArray = duplicates.map(material => material.code);
        setDuplicatedCodes(duplicatedCodesArray);

      } else {
        // If no duplicates are found, proceed with saving the materials
        await createMaterials(storeMaterial);
        emptyStoreMaterial();
      }
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

      <RecibirTableBody duplicatedCodes={duplicatedCodes} />

      <div className="flex w-full mt-2">
        <SaveButton handleSaveMaterials={() => handleSaveMaterials()} />
        <EmptyTable />
      </div>

    </div>
  )
}