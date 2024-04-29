'use client'

import { useMaterialStore, useQrStore, useUiStore } from "@/store"
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from 'react';
import { CodeRepeatedError, DatePicker, EmptyTable, ManualAddMaterial, RecibirTableBody, SaveButton } from "@/components";
import { checkDuplicates, checkObra, getTodayDate, qrToRecibir } from "@/utils";
import { createMaterials, getMaterialsByProject } from "@/actions";
import { SavedSuccessMessage } from '../../../../components/recibir/SavedSuccessMessage';

export const RecibirTable = () => {

  const [errorCodes, setErrorCodes] = useState<string[]>([]);

  const activeProject = useUiStore(state => state.activeProject)
  const storeMaterial = useMaterialStore(state => state.storeMaterial)
  const emptyStoreMaterial = useMaterialStore(state => state.emptyStoreMaterial)
  const isMaterialError = useMaterialStore(state => state.isMaterialError)
  const setIsMaterialError = useMaterialStore(state => state.setIsMaterialError)
  const isMaterialSavedSuccess = useMaterialStore(state => state.isMaterialSavedSuccess)
  const setIsMaterialSavedSuccess = useMaterialStore(state => state.setIsMaterialSavedSuccess)


  useEffect(() => {
    emptyStoreMaterial()
  }, [])

  const [value, setValue] = useState({
    startDate: getTodayDate(),
    endDate: getTodayDate()
  });

  const handleSaveMaterials = async () => {
    if (storeMaterial) {
      const { materials } = await getMaterialsByProject(activeProject?.code);
  
      const duplicates = checkDuplicates(materials, storeMaterial);
      const difObra = checkObra(activeProject?.code, storeMaterial);
  
      if (duplicates.length > 0) {
        setIsMaterialError(`Alguno de los materiales que cargaste ya figuran como recibidos`);
        const duplicatedCodesArray = duplicates.map(material => material.code);
        setErrorCodes(duplicatedCodesArray);
      } else if (difObra.length > 0) {
        setIsMaterialError('El material que esta intentando recibir corresponde a otra obra');
      } else {
        // If no duplicates or materials from different obra are found, proceed with saving the materials
        setIsMaterialSavedSuccess();
        await createMaterials(storeMaterial, value.startDate);
        emptyStoreMaterial();
      }
    }
  };

  return (

    <div className="flex flex-col justify-centerr">

      <ManualAddMaterial />

      <DatePicker
        value={value}
        setValue={setValue}
      />

      {
        isMaterialError && <CodeRepeatedError />
      }

      {
        isMaterialSavedSuccess && <SavedSuccessMessage />
      }

      <RecibirTableBody duplicatedCodes={errorCodes} />

      <div className="flex w-full mt-2">
        <SaveButton handleSaveMaterials={() => handleSaveMaterials()} />
        <EmptyTable />
      </div>

    </div>
  )
}