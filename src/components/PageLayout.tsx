import React from "react";
import { PageHeader } from "./PageHeader";

interface PageLayoutProps {
    title: string;
    children: React.ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
    return (
        <div className="font-sans min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-3.5rem)]">
            <main className="container mx-auto p-6">
                <PageHeader title={title} />
                {children}
            </main>
        </div>
    );
}
