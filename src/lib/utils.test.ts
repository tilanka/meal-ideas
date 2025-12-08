import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
    it('merges class names correctly', () => {
        expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('handles conditional classes', () => {
        expect(cn('class1', undefined, 'class3', null)).toBe('class1 class3');
        expect(cn('class1', true && 'class2', false && 'class3')).toBe('class1 class2');
    });

    it('merges tailwind classes using tailwind-merge', () => {
        expect(cn('p-2 p-4')).toBe('p-4');
        expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });
});
