import React from 'react';

interface CaloriesDisplayProps {
    calories?: string;
}

export function CaloriesDisplay({ calories }: CaloriesDisplayProps) {
    if (!calories) return null;

    return (
        <div className="mb-4">
            <h4 className="text-md font-semibold mb-1">Calories</h4>
            <p className="text-gray-300">{calories}</p>
        </div>
    );
}
