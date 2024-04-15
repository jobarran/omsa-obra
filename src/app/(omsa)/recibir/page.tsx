
import { RecibirTable } from "./ui/RecibirTable";
import { RecibirBotones } from "./ui/RecibirButtons";


export default function RecibirPage() {


    return (

        <div className="min-h-screen flex flex-col items-center justify-start px-6">
            
            <RecibirBotones />
            <RecibirTable />

        </div>
    );
}