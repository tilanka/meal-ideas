import React from "react";
import { MealIdea } from "@/app/actions";
import { CaloriesDisplay } from "./CaloriesDisplay";

interface MealDetailsProps {
    meal: MealIdea;
    actionButton?: React.ReactNode;
}

export function MealDetails({ meal, actionButton }: MealDetailsProps) {
    return (
        <div className="p-4 pt-0 md:p-6 md:pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-4">
                    <CaloriesDisplay calories={meal.totalCalories} />
                    <div>
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                            Ingredients
                        </h4>
                        <ul className="list-disc list-inside space-y-1.5 text-sm leading-relaxed">
                            {meal.ingredients.map((ingredient, i) => (
                                <li key={i}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                        Instructions
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm leading-relaxed">
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
