
export interface Material {
    code: string,
    name: string;
    type: MaterialType;
    quantity: string;
    status: MaterialStatus;
    projectId: string
    received: string | null
    installed: string | null
    tracking: string | null
}



export type MaterialType = 'varios' | 'modulo' | 'pista'
export type MaterialStatus = 'fabrica' | 'recibido' | 'instalado'


