import React from "react";

interface AccordionContainerProps {
    children: React.ReactNode;
}

export function AccordionContainer({ children }: AccordionContainerProps) {
    return (
        <div className="rounded-sm border border-gray-700 overflow-hidden">
            {children}
        </div>
    );
}
