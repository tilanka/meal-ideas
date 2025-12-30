import React from 'react';
import { Flame } from 'lucide-react';

interface CaloriesDisplayProps {
    calories?: string;
}

export function CaloriesDisplay({ calories }: CaloriesDisplayProps) {
    if (!calories) return null;

    return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400">
            <Flame className="h-4 w-4" />
            <span className="text-sm font-medium">{calories}</span>
        </div>
    );
}
