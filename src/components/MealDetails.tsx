import React from "react";
import { MealIdea } from "@/app/actions";
import { CaloriesDisplay } from "./CaloriesDisplay";

interface MealDetailsProps {
    meal: MealIdea;
    actionButton?: React.ReactNode;
}

export function MealDetails({ meal, actionButton }: MealDetailsProps) {
    return (
        <div className="p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <CaloriesDisplay calories={meal.totalCalories} />
                    <h4 className="text-md font-semibold mb-2">Ingredients</h4>
                    <ul className="list-disc list-inside">
                        {meal.ingredients.map((ingredient, i) => (
                            <li key={i}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-md font-semibold mb-2">Instructions</h4>
                    <ol className="list-decimal list-inside">
                        {meal.instructions.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                </div>
            </div>
            {actionButton && (
                <div className="mt-6 flex justify-end">
                    {actionButton}
                </div>
            )}
        </div>
    );
}
