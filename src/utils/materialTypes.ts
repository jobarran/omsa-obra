import { MaterialType } from "@/interfaces";



export const materialTypes = (name:string) => {

    let type: MaterialType;
    if (name.startsWith("M")) {
        type = "modulo";
    } else if (name.startsWith("E")) {
        type = "pista";
    } else {
        type = "varios";
    }

    return type
    
}