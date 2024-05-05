'use client'

import { useState } from "react"

interface Props {
  isDisabled: boolean
  handleAddMaterialToStore: any
}

export const MontarAddButton = ({isDisabled, handleAddMaterialToStore}: Props) => {

  return (

    <button
      onClick={handleAddMaterialToStore}
      type="button"
      className={`flex-1 font-medium text-sm px-5 py-2.5 mb-2 border rounded-lg h-10 ${isDisabled ? 'text-gray-400 bg-transparent border-gray-300' : 'text-gray-700 bg-white border-gray-200 hover:bg-gray-200'}`}
      disabled={isDisabled}

    >
      Agregar 
    </button>

  )
}
