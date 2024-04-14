
import { LinkNewProject } from "./ui/LinkNewProject";

export default function () {
    return (
        <div>
            <div className="flex min-h-screen flex-col items-center p-24">
                <h1>Admin Page</h1>
                <LinkNewProject />
            </div>
        </div>
    );
}