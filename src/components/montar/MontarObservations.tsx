'use client'

import { useState } from "react";

interface Props {
  handleMontarMaterialChange: (data: any) => void
}

export const MontarObservations = ({ handleMontarMaterialChange }: Props) => {
  const [observations, setObservations] = useState('');

  // Handle observations input change
  const handleObservationsChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setObservations(event.target.value);
    handleMontarMaterialChange({ observation: event.target.value });
  };

  return (
    <div className="flex" style={{ zIndex: '1' }}>
      <textarea
        id="Detalle"
        placeholder="Observaciones"
        className="bg-white border text-gray-900 sm:text-sm rounded-lg block p-2.5 w-full h-20 resize-none overflow-auto"
        onChange={handleObservationsChange}
      />
    </div>
  );
};