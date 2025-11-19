interface AccordionHeaderProps {
    title: string;
    isOpen: boolean;
    onClick: () => void;
}

export function AccordionHeader({ title, isOpen, onClick }: AccordionHeaderProps) {
    return (
        <h3
            className="text-m font-bold p-4 cursor-pointer flex justify-between items-start"
            onClick={onClick}
        >
            {title}
            <span>{isOpen ? '−' : '+'}</span>
        </h3>
    );
}