import { ChevronDown } from "lucide-react";

interface AccordionHeaderProps {
    title: string;
    isOpen: boolean;
    onClick: () => void;
}

export function AccordionHeader({ title, isOpen, onClick }: AccordionHeaderProps) {
    return (
        <button
            className="w-full text-left font-semibold p-4 md:p-5 cursor-pointer flex justify-between items-center gap-4 transition-colors hover:bg-muted/30"
            onClick={onClick}
            aria-expanded={isOpen}
        >
            <span className="text-base md:text-lg leading-snug">{title}</span>
            <ChevronDown
                className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                    }`}
            />
        </button>
    );
}