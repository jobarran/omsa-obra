
export interface Material {
    code: string,
    name: string;
    type: MaterialType;
    quantity: string;
    status: MaterialStatus;
    projectId: string
    received: string
    installed: string | null
}



export type MaterialType = 'varios' | 'modulo' | 'pista'
export type MaterialStatus = 'recibido' | 'instalado'

