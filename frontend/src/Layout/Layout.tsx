import {ReactNode} from "react";

interface LayoutProps {
    header: ReactNode;
    footer: ReactNode;
    children: ReactNode;
}

export default function Layout({header, footer, children}: LayoutProps) {
    return (
        <div className="flex flex-col h-screen">
            {header}
            <main className="flex grow flex-col bg-gray-900 text-gray-50">{children}</main>
            <footer>{footer}</footer>
        </div>
    );
}
