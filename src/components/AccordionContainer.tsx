import React from "react";

interface AccordionContainerProps {
    children: React.ReactNode;
}

export function AccordionContainer({ children }: AccordionContainerProps) {
    return (
        <div className="rounded-xl bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:bg-card/70 hover:shadow-lg hover:shadow-primary/5">
            {children}
        </div>
    );
}
