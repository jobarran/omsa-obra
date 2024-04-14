import { TopMenu } from "@/components";
import { ChooseObra } from '../../components/ui/choose-obra/ChooseObra';

export default function OmsaLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <TopMenu />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="container px-4 py-4">
                    <div className="max-w-4xl w-full mx-auto">

                        {children}
                        
                    </div>
                </div>
            </div>

        </main>
    );
}