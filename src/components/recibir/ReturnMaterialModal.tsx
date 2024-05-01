'use client';

import { useUiStore } from "@/store"

import { useEffect, useState } from "react";
import { Material } from "@/interfaces";
import { getMaterialsByProject, updateMaterial } from "@/actions";
import { sortMaterials, trakingEntry } from "@/utils";

interface Props {
    returnModal: boolean
    setReturnModal: () => void
}

export const ReturnMaterialModal = ({ returnModal, setReturnModal }: Props) => {

    //todo: create a search dropdown instead of using select

    const activeProject = useUiStore(state => state.activeProject)

    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectMaterial, setSelectMaterial] = useState<Material>();
    const [description, setDescription] = useState<string>('')

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const result = await getMaterialsByProject(activeProject?.code);
                if (result.ok) {
                    const fetchedMaterials = result.materials || [];
                    const recibidoMaterials = fetchedMaterials.filter(material => material.status === 'recibido');
                    const orderedNotInstalledMaterials = sortMaterials(recibidoMaterials);
                    setMaterials(orderedNotInstalledMaterials);
                    setSelectMaterial(undefined);
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (returnModal && activeProject) {
            fetchMaterials();
        }
    }, [returnModal, activeProject]);


    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target instanceof HTMLDivElement && event.target.id === 'add-task-modal') {
            setReturnModal();
        }
    };

    const handleMaterialChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMaterial = materials.find(material => material.id === event.target.value);
        setSelectMaterial(selectedMaterial);
        console.log(selectMaterial)
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const onSubmit = async () => {
        if (!selectMaterial) {
            console.error("No material selected");
            return;
        }

        const trakingData = trakingEntry(selectMaterial,'devolver', description)

        const updatedMaterial = { ...selectMaterial, tracking: trakingData };

        try {
            await updateMaterial(updatedMaterial);
        } catch (error) {
            console.error("Error updating material:", error);
        }
    }

    const modalClasses = `fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 transition-opacity duration-300 ${returnModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
    const modalContentClasses = `bg-white rounded-lg overflow-hidden h-auto w-full max-w-xs md:max-w-sm transition-opacity duration-300 ${returnModal ? 'opacity-100' : 'opacity-0'}`;
    const blurEffectClasses = `fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${returnModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;


    return (
        <div>
            <div className={blurEffectClasses}></div>
            <div
                id="add-task-modal"
                tabIndex={-1}
                aria-hidden={returnModal}
                className={modalClasses}
                onClick={handleOverlayClick}
            >
                <div className={modalContentClasses}>
                    <div className="p-4">
                        <div className="flex items-start justify-between py-2 border-b rounded-t">
                            <div className="flex flex-col">
                                <h1 className="flex items-center md:text-xl font-extrabold">
                                    Devolver Material
                                </h1>
                            </div>
                        </div>
                        <div className="overflow-auto max-h-[70vh]">
                            <form className="space-y-4 md:space-y-6">
                                <div className="flex flex-col items-center mt-4">

                                    <select
                                        id="material"
                                        value={selectMaterial?.id || ''} // Control the value of the select input
                                        onChange={handleMaterialChange}
                                        className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
                                    >
                                        <option value="" disabled defaultValue="">Elegir Material</option>
                                        {materials.map(material => (
                                            <option key={material.id} value={material.id}>
                                                {material.projectId}-{material.name}-{material.code}
                                            </option>
                                        ))}
                                    </select>

                                    <textarea
                                        id="Detalle"
                                        placeholder="Detalle"
                                        className="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                        onChange={handleDescriptionChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    onClick={onSubmit}
                                    className={`font-medium text-sm px-4 py-2 border rounded-lg text-gray-700 bg-white border-gray-200 hover:bg-gray-200'}`}
                                >
                                    Devolver Material
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};