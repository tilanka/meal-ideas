import React from 'react';
import { Flame } from 'lucide-react';

interface CaloriesDisplayProps {
    calories?: string;
}

export function CaloriesDisplay({ calories }: CaloriesDisplayProps) {
    if (!calories) return null;

    return (
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-muted/50 text-muted-foreground mb-4">
            <Flame className="h-4 w-4" />
            <span className="text-sm font-medium">{calories}</span>
        </div>
    );
}
