'use client'

import { useQrStore } from "@/store"


export const RecibirTable = () => {

  const scannedQr = useQrStore(state => state.scannedQr)


  return (

    <div>
      <table>
        <thead>
          <tr>
            <th>Obra</th>
            <th>Modulo</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {scannedQr?.map((item, index) => {
            const [obra, modulo, id] = item.split('-');
            return (
              <tr key={index}>
                <td>{obra}</td>
                <td>{modulo}</td>
                <td>{id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>    <div>UPLOAD</div>
    </div>
  )
}
