import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AccordionHeader } from './AccordionHeader';

describe('AccordionHeader', () => {
    it('renders the title', () => {
        render(<AccordionHeader title="Section Title" isOpen={false} onClick={() => { }} />);
        expect(screen.getByText('Section Title')).toBeInTheDocument();
    });

    it('displays + when closed', () => {
        render(<AccordionHeader title="Section Title" isOpen={false} onClick={() => { }} />);
        expect(screen.getByText('+')).toBeInTheDocument();
        expect(screen.queryByText('−')).not.toBeInTheDocument();
    });

    it('displays − when open', () => {
        render(<AccordionHeader title="Section Title" isOpen={true} onClick={() => { }} />);
        expect(screen.getByText('−')).toBeInTheDocument();
        expect(screen.queryByText('+')).not.toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn();
        render(<AccordionHeader title="Section Title" isOpen={false} onClick={handleClick} />);

        fireEvent.click(screen.getByRole('heading'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
