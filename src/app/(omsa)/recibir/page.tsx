
import { RecibirTable } from "./ui/RecibirTable";
import { RecibirBotones } from "./ui/RecibirButtons";


export default function RecibirPage() {


    return (

        <div className="flex flex-col justify-start mx-auto max-w-xl">
            
            <RecibirBotones />
            <RecibirTable />

        </div>
    );
}