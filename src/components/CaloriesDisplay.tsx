import React from 'react';

interface CaloriesDisplayProps {
    calories?: string;
}

export function CaloriesDisplay({ calories }: CaloriesDisplayProps) {
    if (!calories) return null;

    return (
        <div className="inline-flex items-center px-4 py-2 rounded-lg bg-muted/50 text-muted-foreground mb-4">
            <span className="text-sm font-medium">{calories}</span>
        </div>
    );
}
