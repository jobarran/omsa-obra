import { Title } from "@/components";
import { RegisterProjectForm } from "./ui/RegisterProjectForm";
import { getProjectShortNames } from "@/actions";



export default async function () {

    const { ok, projectShortNames } = await getProjectShortNames();

    // Filter out null values from projectShortNames array
    const filteredProjectShortNames = projectShortNames?.filter(name => name !== null) as string[];

    return (

        <div>
            <RegisterProjectForm projectShortNames={filteredProjectShortNames} />
        </div>

    );
}