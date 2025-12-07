import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AccordionContainer } from './AccordionContainer';

describe('AccordionContainer', () => {
    it('renders children correctly', () => {
        render(
            <AccordionContainer>
                <div>Test Content</div>
            </AccordionContainer>
        );
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
});
