import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CaloriesDisplay } from './CaloriesDisplay';

describe('CaloriesDisplay', () => {
    it('renders nothing when calories prop is missing', () => {
        const { container } = render(<CaloriesDisplay />);
        expect(container.firstChild).toBeNull();
    });

    it('renders calories when prop is provided', () => {
        render(<CaloriesDisplay calories="500" />);
        expect(screen.getByText('Calories')).toBeInTheDocument();
        expect(screen.getByText('500')).toBeInTheDocument();
    });
});
