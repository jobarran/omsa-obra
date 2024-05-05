'use client'


interface Props {
    data: {
        material: string,
        date: string,
        floor: string,
        possition: string,
        observation: string
    }
}

export const MontarMatPrev = ({ data }: Props) => {

    const { material, date, floor, possition, observation } = data;
    const truncatedObservation = observation.length > 20 ? observation.slice(0, 20) + "..." : observation;


    return (
        <div id="material" className={`w-2/4 h-44 mr-1 bg-white border ${material && date && floor && possition ? 'border-green-500' : 'border-gray-200'} text-gray-900 sm:text-sm rounded-lg p-4`}>
            <p className="text-sm text-gray-600"><span className="text-base text-gray-900 font-semibold mr-2">Mod</span>{material}</p>
            <p className="text-sm text-gray-600"><span className="text-base text-gray-900 font-semibold mr-2">Fecha</span>{date}</p>
            <p className="text-sm text-gray-600"><span className="text-base text-gray-900 font-semibold mr-2">Piso</span>{floor}</p>
            <p className="text-sm text-gray-600"><span className="text-base text-gray-900 font-semibold mr-2">Posición</span>{possition}</p>
            <p className="text-base text-gray-900 font-semibold">Observations</p>
            <p className="text-sm text-gray-600">{truncatedObservation}</p>
        </div>
    );
};