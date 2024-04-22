'use client'

import { getTodayDate } from "@/utils";
import dayjs from "dayjs";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

interface Props {
  value: any,
  setValue: any
}

export const DatePicker = ({value, setValue}: Props) => {

  // Event handler for when the date value changes
  const handleValueChange = (newValue: any) => {
    console.log(newValue)
    setValue(newValue);
  }

  // Rendering the Datepicker component with some configurations
  return (
    <div className="py-2 w-full">
      <Datepicker
        asSingle={true}
        useRange={false} // Indicates whether to use a range of dates or single date selection
        inputClassName="bg-white border border-gray-200 text-gray-900 sm:text-sm rounded-lg  w-full h-10 p-2.5"
        placeholder={"Elegir Fecha"} // Placeholder text for the input field
        value={value} // Selected date(s) value
        onChange={handleValueChange} // Event handler for date selection changes
        displayFormat={"DD/MM/YYYY"}
      />
    </div>
  )
}