import { useMaterialStore, useQrStore } from '@/store';
import { qrTableData } from '@/utils';
import React from 'react'
import { MdDelete } from 'react-icons/md';

interface Props {
    duplicatedCodes: string[]
}

export const RecibirTableBody = ({ duplicatedCodes }: Props) => {

    const storeMaterial = useMaterialStore(state => state.storeMaterial)
    const deleteStoreMaterial = useMaterialStore(state => state.deleteStoreMaterial)

    const handleRemoveQr = (materialCode: string) => {
        deleteStoreMaterial(materialCode)
    }

    return (
        <div className="py-2 w-full overflow-hidden rounded-lg bg-white border border-gray-200">
            <table className="border-collapse text-left text-sm text-gray-500 w-full">
                <thead className="text-md text-uppercase table-header-group">
                    <tr>
                        <th className="px-4 py-4 font-semibold text-gray-900 text-center">Obra</th>
                        <th className="px-4 py-4 font-semibold text-gray-900 sm:w-1/6 md:w-1/4 lg:w-1/3 text-center">Tipo</th>
                        <th className="px-4 py-4 font-semibold text-gray-900 text-center">Código</th>
                        <th className="px-4 py-4 font-semibold text-gray-900 text-center">ID</th>
                        <th className="px-2 py-4 font-semibold text-gray-900 text-center">Editar</th>
                    </tr>
                </thead>
                {storeMaterial?.length === 0 ? (
                    <tbody>
                        <tr>
                            <td colSpan={5} className="py-4 text-center text-gray-500">No hay materiales cargados</td>
                        </tr>
                    </tbody>
                ) : (
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {storeMaterial?.map((item) => (
                            <tr key={item.code} className={duplicatedCodes?.includes(item.code) ? "bg-red-200" : "hover:bg-gray-50"}>
                                <td className="pl-6 pr-2 py-4 font-medium text-gray-900 text-center">{item.projectId}</td>
                                <td className="px-2 py-4 text-center">{item.type}</td>
                                <td className="px-2 py-4 text-center">{item.name}</td>
                                <td className="px-2 py-4 text-center">{item.code}</td>
                                <td className="pl-2 pr-6 py-4 text-center">
                                    <div className="flex justify-end gap-3 text-lg">
                                        <MdDelete onClick={() => handleRemoveQr(item.code)} className="text-red-600 cursor-pointer" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}

            </table>
        </div>
    )
}