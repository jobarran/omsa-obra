'use client'

import { useMaterialStore, useQrStore, useUiStore } from "@/store"
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from 'react';
import { CodeRepeatedError, DatePicker, EmptyTable, RecibirTableBody, SaveButton } from "@/components";
import { checkDuplicates, getTodayDate, qrToRecibir } from "@/utils";
import { createMaterials, getMaterialsByProject } from "@/actions";
import { SavedSuccessMessage } from '../../../../components/recibir/SavedSuccessMessage';

export const RecibirTable = () => {

  const [duplicatedCodes, setDuplicatedCodes] = useState<string[]>([]);

  const activeProject = useUiStore(state => state.activeProject)
  const storeMaterial = useMaterialStore(state => state.storeMaterial)
  const emptyStoreMaterial = useMaterialStore(state => state.emptyStoreMaterial)
  const isMaterialDuplicated = useMaterialStore(state => state.isMaterialDuplicated)
  const setIsMaterialDuplicated = useMaterialStore(state => state.setIsMaterialDuplicated)
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

      const duplicates = checkDuplicates(materials, storeMaterial)

      if (duplicates.length > 0) {

        setIsMaterialDuplicated(`Alguno de los materiales que cargaste ya figuran como recibidos`);
        const duplicatedCodesArray = duplicates.map(material => material.code);
        setDuplicatedCodes(duplicatedCodesArray);

      } else {
        // If no duplicates are found, proceed with saving the materials
        setIsMaterialSavedSuccess()
        await createMaterials(storeMaterial, value.startDate);
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
        isMaterialDuplicated && <CodeRepeatedError />
      }

      {
        isMaterialSavedSuccess && <SavedSuccessMessage />
      }

      <RecibirTableBody duplicatedCodes={duplicatedCodes} />

      <div className="flex w-full mt-2">
        <SaveButton handleSaveMaterials={() => handleSaveMaterials()} />
        <EmptyTable />
      </div>

    </div>
  )
}