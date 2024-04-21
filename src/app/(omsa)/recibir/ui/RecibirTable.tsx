'use client'

import { useQrStore } from "@/store"


export const RecibirTable = () => {

  const scannedQr = useQrStore(state => state.scannedQr)


  return (

    <div>
      <table>
        <thead className="text-md text-uppercase table-header-group">
          <tr>
            <th className="pl-2 py-3">Obra</th>
            <th className="pl-2 py-3">Tipo</th>
            <th className="pl-2 py-3">Código</th>
            <th className="pl-2 py-3">ID</th>
            <th className="pl-2 py-3">Editar</th>
          </tr>
        </thead>

        {scannedQr?.map((item, index) => {
          const [obra, modulo, id] = item.split('-');
          return (
            <tbody key={index}>
              <tr
                className="pl-2 py-3 font-medium text-gray-900 whitespace-nowrap border-l-4 border-b-4 border-gray-50"
              >
                <td
                  className="pl-2 pr-3 py-3 font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50 text-center"
                >{obra}</td>
                <td
                  className="pl-2 pr-3 py-3 font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50 text-center"
                >{modulo}</td>
                <td
                  className="pl-2 pr-3 py-3 font-medium text-gray-900 whitespace-nowrap border-b-4 border-gray-50 text-center"
                >{id}</td>
              </tr>
            </tbody>
          );
        })}

      </table>
      <div>UPLOAD</div>
    </div>
  )
}
