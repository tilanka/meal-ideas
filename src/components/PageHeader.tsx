import React from "react";

interface PageHeaderProps {
    title: string;
    children?: React.ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
    return (
        <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold text-gray-100">{title}</h1>
            <div className="flex gap-4">{children}</div>
        </div>
    );
}
