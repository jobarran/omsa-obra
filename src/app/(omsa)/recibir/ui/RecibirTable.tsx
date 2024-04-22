'use client'

import { useQrStore } from "@/store"
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from 'react';
import { DatePicker, EmptyTable, RecibirTableBody, SaveButton } from "@/components";
import { getTodayDate } from "@/utils";



export const RecibirTable = () => {

  const scannedQr = useQrStore(state => state.scannedQr)
  const emptyScannedQr = useQrStore(state => state.emptyScannedQr)

  useEffect(() => {
    emptyScannedQr()
  }, [])

  const [value, setValue] = useState({
    startDate: getTodayDate(),
    endDate: getTodayDate()
  });

  return (

    <div>
      <DatePicker
        value={value}
        setValue={setValue}
      />
      <RecibirTableBody />
      <SaveButton />
      <EmptyTable />
    </div>
  )
}