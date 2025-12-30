import React from "react";
import { PageHeader } from "./PageHeader";

interface PageLayoutProps {
    title: string;
    children: React.ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
    return (
        <div className="font-sans min-h-screen">
            <main className="container mx-auto p-6">
                <PageHeader title={title} />
                {children}
            </main>
        </div>
    );
}
