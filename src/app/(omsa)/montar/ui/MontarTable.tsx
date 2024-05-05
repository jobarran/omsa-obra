'use client'

import { useMaterialStore, useUiStore } from "@/store"
import { useEffect, useState } from 'react';
import { ButtonCard, ButtonCardUploadRemito, CodeRepeatedError, EmptyTableButton, ManualAddMaterial, MontarAddButton, MontarDatePicker, MontarFloorAndPossition, MontarMatPrev, MontarObservations, RecibirTableBody, ReturnMaterialModal, SaveButton } from "@/components";
import { checkDuplicates, checkObra, getTodayDate } from "@/utils";
import { createMaterials, getMaterialsByProject } from "@/actions";
import { SavedSuccessMessage } from '../../../../components/recibir/SavedSuccessMessage';
import MontarQrReader from "@/components/qr/MontarQrReader";
import { FaQrcode, FaCamera } from 'react-icons/fa';
import { FaPenToSquare, FaArrowRightArrowLeft } from 'react-icons/fa6';

export const MontarTable = () => {

  const [errorCodes, setErrorCodes] = useState<string[]>([]);
  const [returnModal, setReturnModal] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [qrReader, setQrReader] = useState(false)
  const [montarMaterial, setMontarMaterial] = useState({
    material: "",
    date: getTodayDate(),
    floor: "",
    possition: "",
    observation: ""
  });


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
    
  };

  const handleMontarMaterialChange = (data: any) => {
    setMontarMaterial((prevMaterial) => ({
      ...prevMaterial,
      ...data // Merge the new data with existing montarMaterial state
    }));
  }

  return (

    <div>
      <div className="-mx-1">

        {
          qrReader &&
          <MontarQrReader
            qrReader={qrReader}
            setQrReader={() => setQrReader(!qrReader)}
            handleMontarMaterialChange={handleMontarMaterialChange}
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

      <div className="flex flex-col justify-centerr">

        <div className="flex my-2">

          <MontarMatPrev
            data={montarMaterial}
          />

          <div id="data" className="w-2/4 flex flex-col ml-1">
            <MontarDatePicker
              value={value}
              setValue={setValue}
              handleMontarMaterialChange={handleMontarMaterialChange}
            />
            <MontarFloorAndPossition
              handleMontarMaterialChange={handleMontarMaterialChange}
            />
            <MontarObservations
              handleMontarMaterialChange={handleMontarMaterialChange}
            />
          </div>
        </div>


        <MontarAddButton
          isDisabled={montarMaterial.material && montarMaterial.date && montarMaterial.floor && montarMaterial.possition ? false : true}
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
          <EmptyTableButton />
        </div>

      </div>
    </div>
  )
}