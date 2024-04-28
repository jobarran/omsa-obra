'use client'

import { useMaterialStore, useQrStore } from '@/store'
import React from 'react'

interface Props {
  handleSaveMaterials: () => void
}

export const SaveButton = ({ handleSaveMaterials }: Props) => {

  const storeMaterial = useMaterialStore(state => state.storeMaterial)
  const isDisabled = storeMaterial?.length === 0;

  return (

    <button
      onClick={handleSaveMaterials}
      type="button"
      className={`flex-1 font-medium text-sm px-5 py-2.5 me-2 mb-2 border rounded-lg ${isDisabled ? 'text-gray-400 bg-transparent border-gray-300' : 'text-gray-700 bg-white border-gray-200 hover:bg-gray-200'}`}
      disabled={isDisabled}

    >
      Guardar ({storeMaterial?.length})
    </button>

  )
}
