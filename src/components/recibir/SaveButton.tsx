'use client'

import { useQrStore } from '@/store'
import React from 'react'

interface Props {
  handleSaveMaterials: () => void
}

export const SaveButton = ({handleSaveMaterials}: Props) => {

  const scannedQr = useQrStore(state => state.scannedQr)


  return (

    <button
      onClick={handleSaveMaterials}
      type="button"
      className="flex-1 font-medium text-sm px-5 py-2.5 me-2 mb-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-200"
    >
      Guardar ({scannedQr?.length})
    </button>

  )
}
