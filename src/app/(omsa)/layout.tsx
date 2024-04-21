import { TopMenu } from "@/components";
import { auth } from "@/auth.config";
import { getProjects } from "@/actions";

export default async function OmsaLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const session = await auth()
    const { projects = [] } = await getProjects();

    if (!session?.user ) {
        return null
    }

    return (

        <main>

            <TopMenu user={session.user} projects={projects} />

            <div className="flex flex-col items-center justify-center">
                <div className="container px-4 py-4">
                    <div className="max-w-4xl w-full mx-auto">

                        {children}

                    </div>
                </div>
            </div>

        </main>

    );
}