'use client';

import { useMaterialStore, useUiStore } from "@/store"
import { qrScannerToObject } from "@/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";

type FormInputs = {
    projectId: string;
    name: string;
    code: string;
}

interface Props {
    addModal: boolean;
    setAddModal: () => void
}

export const ManualAddMaterial = ({ addModal, setAddModal }: Props) => {

    const storeMaterial = useMaterialStore(state => state.storeMaterial)
    const setIsMaterialError = useMaterialStore(state => state.setIsMaterialError)
    const setStoreMaterial = useMaterialStore(state => state.setStoreMaterial)
    const activeProject = useUiStore(state => state.activeProject)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>()

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target instanceof HTMLDivElement && event.target.id === 'add-task-modal') {
            setAddModal();
            reset()
        }
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        if (data) {

            const stringData = `${data.projectId}-${data.name}-${data.code}`;

            // Create data object from scanned QR
            const dataObject = qrScannerToObject(stringData);

            // Check if data already exists in storeMaterial array
            const isDataRepeated = storeMaterial?.some((material) => {
                // Compare codes first
                if (material.code === data.code) {
                    // Check if the first characters of names are the same
                    if (material.name[0] === data.name[0]) {
                        // Return true if both code and first characters of names match
                        return true;
                    }
                }
                // Return false if either code or first characters of names don't match
                return false;
            });

            if (isDataRepeated) {
                // If data already exists in storeMaterial array
                setIsMaterialError("Este material ya figura en tu listado");
                setAddModal();
                console.log('This material is already listed');
            } else {
                // If data is not in storeMaterial array, add it
                setStoreMaterial(dataObject);
                setAddModal();
                reset()
                console.log('Material added to storeMaterial');
            }
        }
        console.log(storeMaterial);
    }

    const modalClasses = `fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 transition-opacity duration-300 ${addModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
    const modalContentClasses = `bg-white rounded-lg overflow-hidden h-auto w-full max-w-xs md:max-w-sm xl:max-w-lg transition-opacity duration-300 ${addModal ? 'opacity-100' : 'opacity-0'}`;
    const blurEffectClasses = `fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${addModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;


    return (
        <div>
            <div className={blurEffectClasses}></div>
            <div
                id="add-task-modal"
                tabIndex={-1}
                aria-hidden={addModal}
                className={modalClasses}
                onClick={handleOverlayClick}
            >
                <div className={modalContentClasses}>
                    <div className="p-4">
                        <div className="flex items-start justify-between py-2 border-b rounded-t">
                            <div className="flex flex-col">
                                <h1 className="flex items-center md:text-xl font-extrabold">
                                    Agregar Material
                                </h1>
                            </div>
                        </div>
                        <div className="overflow-auto max-h-[70vh]">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                                <div className="flex items-center mt-4">
                                    <div className="flex-1 flex items-center">
                                        <input
                                            type="text"
                                            id="projectId"
                                            placeholder="Obra"
                                            maxLength={4}
                                            defaultValue={activeProject?.code}
                                            readOnly // Add readOnly attribute here to disable editing
                                            className="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-8 p-2.5 mr-1"
                                            style={{ pointerEvents: 'none' }}
                                            {...register('projectId', {
                                                required: true,
                                            })}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-gray-600 mx-2">-</span>
                                    </div>
                                    <div className="flex-1 flex items-center">
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Nombre"
                                            maxLength={4}
                                            className={clsx(
                                                "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-8 p-2.5 mr-1",
                                                {
                                                    'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                                                }
                                            )}
                                            {...register('name', {
                                                required: true,
                                            })}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-gray-600 mx-2">-</span>
                                    </div>
                                    <div className="flex-1 flex items-center">
                                        <input
                                            type="text"
                                            id="code"
                                            placeholder="ID"
                                            maxLength={4}
                                            className={clsx(
                                                "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full h-8 p-2.5",
                                                {
                                                    'focus:outline-none focus:border-2 border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!errors.name
                                                }
                                            )}
                                            {...register('code', {
                                                required: true,
                                            })}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className={`font-medium text-sm px-4 py-2 border rounded-lg text-gray-700 bg-white border-gray-200 hover:bg-gray-200'}`}
                                >
                                    Agregar Material
                                </button>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};