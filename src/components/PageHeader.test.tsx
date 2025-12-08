import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
    it('renders the title', () => {
        render(<PageHeader title="Test Title" />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        render(<PageHeader title="Test Title" />);
        expect(screen.getByRole('link', { name: /meal ideas/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /saved meals/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /shopping list/i })).toBeInTheDocument();
    });
});
