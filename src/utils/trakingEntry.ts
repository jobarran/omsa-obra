import { Material } from "@/interfaces";


export const trakingEntry = (material:Material, subject:string, description?:string) => {

    const date = '2024-05-01'; //todo: set day of return
        const userName = 'Joaquin Barrandeguy' //todo: get session

        const trackingEntry = `${date}-${userName}-${subject}-${description ? description : ''}`;

        let trakingData = trackingEntry;

        if (material.tracking) {
            trakingData = `${material.tracking}\n${trackingEntry}`;
        }

        return trakingData
}