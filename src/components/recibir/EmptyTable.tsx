import { useQrStore } from '@/store'
import React from 'react'

export const EmptyTable = () => {

  const emptyScannedQr = useQrStore(state => state.emptyScannedQr)


  return (
    
    <button
    onClick={emptyScannedQr}
      type="button"
      className="flex-1 font-medium text-sm px-5 py-2.5 mb-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-200"
    >
      Borrar todos
    </button>
  )
}
