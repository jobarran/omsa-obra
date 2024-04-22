import { useQrStore } from '@/store';
import React from 'react'
import { MdDelete } from 'react-icons/md';

export const RecibirTableBody = () => {

    const scannedQr = useQrStore(state => state.scannedQr)
    const deleteScannedQr = useQrStore(state => state.deleteScannedQr)
    const emptyScannedQr = useQrStore(state => state.emptyScannedQr)
    
    const handleRemoveQr = (qr: string) => {
        deleteScannedQr(qr)
      }

    return (
        <div className="py-2 w-full overflow-hidden rounded-lg border border-gray-200">
            <table className="border-collapse bg-white text-left text-sm text-gray-500 w-full">
                <thead className="text-md text-uppercase table-header-group">
                    <tr>
                        <th className="px-4 py-4 font-medium text-gray-900">Obra</th>
                        <th className="px-6 py-4 font-medium text-gray-900 sm:w-1/6 md:w-1/4 lg:w-1/3">Tipo</th>
                        <th className="px-6 py-4 font-medium text-gray-900">Código</th>
                        <th className="px-4 py-4 font-medium text-gray-900">ID</th>
                        <th className="px-6 py-4 font-medium text-gray-900">Editar</th>
                    </tr>
                </thead>

                {scannedQr?.map((item, index) => {
                    const [obra = "", nombre = "", id = ""] = item.split("-");
                    const tipo = nombre.startsWith("M") ? "Modulo" : nombre.startsWith("E") ? "Pista" : ""; // Determine tipo based on nombre
                    return (
                        <tbody
                            key={index}
                            className="divide-y divide-gray-100 border-t border-gray-100"
                        >
                            <tr
                                className="hover:bg-gray-50"
                            >
                                <td className="pl-6 pr-2 py-4 font-medium text-gray-900">
                                    {obra}
                                </td>
                                <td className="px-2 py-4">
                                    {tipo}
                                </td>
                                <td className="px-2 py-4">
                                    {nombre}
                                </td>
                                <td className="px-2 py-4">
                                    {id}
                                </td>
                                <td className="pl-2 pr-6 py-4">
                                    <div className="flex justify-end gap-3 text-lg">
                                        <MdDelete onClick={() => handleRemoveQr(item)} className="text-red-600" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}

            </table>
        </div>)
}
