'use client'

import Datepicker from "react-tailwindcss-datepicker";

interface Props {
  value: any,
  setValue: any,
  handleMontarMaterialChange: (data: any) => void
}

export const MontarDatePicker = ({value, setValue, handleMontarMaterialChange}: Props) => {

  const handleValueChange = (newValue: any) => {
    setValue(newValue)
    handleMontarMaterialChange({date:newValue.startDate})
  }

  return (
    <div className="pb-2 w-full" style={{ zIndex: '1' }}>
      <Datepicker
        asSingle={true}
        useRange={false} // Indicates whether to use a range of dates or single date selection
        inputClassName="bg-white border border-gray-200 text-gray-900 sm:text-sm rounded-lg w-full h-10 p-2.5"
        placeholder={"Elegir Fecha"} // Placeholder text for the input field
        value={value} // Selected date(s) value
        onChange={handleValueChange} // Event handler for date selection changes
        displayFormat={"DD/MM/YYYY"}
      />
    </div>
  )
}