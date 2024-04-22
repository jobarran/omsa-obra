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
      className="flex-1 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    >
      Guardar ({scannedQr?.length})
    </button>

  )
}
