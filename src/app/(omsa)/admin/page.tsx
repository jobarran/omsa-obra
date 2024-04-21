
import { LinkNewProject } from "./ui/LinkNewProject";

export default function AdminPage() {
    return (
        <div>
            <div className="flex flex-col items-center p-24">
                <h1>Admin Page</h1>
                <LinkNewProject />
            </div>
        </div>
    );
}