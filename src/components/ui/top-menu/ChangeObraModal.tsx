'use client';

import { useUiStore } from "@/store"
import { Project } from "@prisma/client"

interface Props {
    projects: Project[],
    setIsChangeObraModalOpen: () => void,
    isChangeObraModalOpen: boolean,
}

export const ChangeObraModal = ({ projects, isChangeObraModalOpen, setIsChangeObraModalOpen }: Props) => {

    const setProject = useUiStore(state => state.setProject)

    
    const handleChangeProject = (project: Project) => {
        setProject(project)
        setIsChangeObraModalOpen();
      }

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target instanceof HTMLDivElement && event.target.id === 'add-task-modal') {
            setIsChangeObraModalOpen();
        }
    };

    const modalClasses = `fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 transition-opacity duration-300 ${isChangeObraModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
    const modalContentClasses = `bg-white rounded-lg overflow-hidden h-3/6 md:h-3/6 w-full w-5/6 sm:max-w-sm xl:max-w-lg transition-opacity duration-300 ${isChangeObraModalOpen ? 'opacity-100' : 'opacity-0'}`;
    const blurEffectClasses = `fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${isChangeObraModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;


    return (
        <div>
            <div className={blurEffectClasses}></div>

            <div
                id="add-task-modal"
                tabIndex={-1}
                aria-hidden={!isChangeObraModalOpen}
                className={modalClasses}
                onClick={handleOverlayClick}
            >
                <div className={modalContentClasses}>
                    <div className="p-2 md:p-5">
                        <div className="flex items-start justify-between py-2 border-b rounded-t">
                            <div className="flex flex-col">
                                <h1 className="flex items-center md:text-xl font-extrabold">
                                    Elegir obra
                                </h1>


                            </div>

                        </div>
                        <div className="overflow-auto max-h-[70vh]">

                            {
                                projects?.map((item: any, index: number) => (
                                    <div key={index} className="cursor-pointer py-2" onClick={() => handleChangeProject(item)}>
                                        {item.shortName} - {item.name}
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
