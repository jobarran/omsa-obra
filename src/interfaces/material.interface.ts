
export interface Material {
    id: string;
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
export type MaterialStatus = 'recibido' | 'instalado' | 'fabrica'


