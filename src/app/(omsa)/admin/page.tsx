
import { LinkNewProject } from "./ui/LinkNewProject";
import { ProjectTable } from "./ui/ProjectTable";

export default function AdminPage() {
    
    return (
        <div>
            <div className="flex flex-col items-center">
                <h1>Admin Page</h1>
                <LinkNewProject />
                <ProjectTable />
            </div>
        </div>
    );
}