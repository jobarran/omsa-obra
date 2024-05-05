'use client'

import { useEffect, useState } from "react";

const possitions = [
  { floor: "1", possition: "1" },
  { floor: "1", possition: "2" },
  { floor: "1", possition: "4" },
  { floor: "1", possition: "5" },
  { floor: "1", possition: "6" },
  { floor: "1", possition: "8" },
  { floor: "1", possition: "10" },
  { floor: "2", possition: "11" },
  { floor: "2", possition: "13" },
  { floor: "2", possition: "14" },
  { floor: "2", possition: "17" },
  { floor: "2", possition: "19" },
  { floor: "2", possition: "20" },
  { floor: "3", possition: "3" },
  { floor: "3", possition: "2" },
  { floor: "3", possition: "4" },
  { floor: "3", possition: "5" },
  { floor: "3", possition: "6" },
  { floor: "3", possition: "8" },
]

interface Props {
  handleMontarMaterialChange: (data: any) => void
}

export const MontarFloorAndPossition = ({ handleMontarMaterialChange }: Props) => {
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');

  // Filter positions for the selected floor
  const filteredPositions = possitions.filter(position => position.floor === selectedFloor);

  // Handle floor input change
  const handleFloorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFloor(event.target.value);
    setSelectedPosition(''); // Reset selected position when floor changes
    handleMontarMaterialChange({floor:event.target.value})
  };

  // Handle position select change
  const handlePositionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPosition(event.target.value);
    handleMontarMaterialChange({possition:event.target.value})
  };

  return (
    <div className="pb-2 w-full flex" style={{ zIndex: '1' }}>
      <input
        type="text"
        id="floor"
        placeholder="Piso"
        maxLength={4}
        className="border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 mr-2 h-10"
        value={selectedFloor}
        onChange={handleFloorChange}
      />
      <select
        id="position"
        value={selectedPosition}
        onChange={handlePositionChange}
        className={`border text-sm rounded-lg block w-full p-2.5 h-10 ${!selectedFloor ? 'text-gray-400 bg-transparent border-gray-300' : 'text-gray-700 border-gray-200'}`}
        disabled={!selectedFloor}
      >
        <option value="" disabled defaultValue="">Posicion</option>
        {filteredPositions.map(position => (
          <option key={position.floor + position.possition} value={position.possition}>
            {position.possition}
          </option>
        ))}
      </select>
    </div>
  );
};