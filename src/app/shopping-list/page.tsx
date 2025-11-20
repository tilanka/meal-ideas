"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MealIdea } from "../actions";
import { PageHeader } from "../../components/PageHeader";

export default function ShoppingList() {
    const [meals, setMeals] = useState<MealIdea[]>([]);
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

    useEffect(() => {
        const saved = localStorage.getItem("savedMeals");
        if (saved) {
            try {
                const savedMeals: MealIdea[] = JSON.parse(saved);
                setMeals(savedMeals);
            } catch (e) {
                console.error("Failed to parse saved meals", e);
            }
        }
    }, []);

    const toggleItem = (item: string) => {
        setCheckedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(item)) {
                newSet.delete(item);
            } else {
                newSet.add(item);
            }
            return newSet;
        });
    };

    const allIngredients = meals.flatMap((meal) => meal.ingredients);
    const uniqueIngredients = Array.from(new Set(allIngredients));

    return (
        <div className="font-sans min-h-screen">
            <main className="container mx-auto p-6">
                <PageHeader title="Shopping List"></PageHeader>

                {meals.length === 0 ? (
                    <div className="text-center mt-20">
                        <p className="text-xl">Your shopping list is empty.</p>
                        <p className="mt-2">Save some meals to see ingredients here!</p>
                        <Link href="/" className="mt-4 inline-block">
                            Generate some ideas
                        </Link>
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto rounded-lg shadow-md border p-6">
                        <div className="space-y-6">
                            {meals.map((meal) => (
                                <div key={meal.title}>
                                    <h3 className="text-md font-semibold mb-2">{meal.title}</h3>
                                    <ul className="space-y-3">
                                        {meal.ingredients.map((item, index) => (
                                            <li
                                                key={index}
                                                className={`flex items-center rounded-md transition-colors cursor-pointer p-1 ${checkedItems.has(item)
                                                    ? "line-through"
                                                    : "hover:bg-gray-600"
                                                    }`}
                                                onClick={() => toggleItem(item)}
                                            >
                                                <div className={`w-5 h-5 rounded border mr-4 flex items-center justify-center transition-colors ${checkedItems.has(item)
                                                    ? "bg-blue-600 border-blue-600"
                                                    : "border-gray-500"
                                                    }`}>
                                                    {checkedItems.has(item) && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 text-right text-gray-400 text-sm">
                            {checkedItems.size} of {uniqueIngredients.length} items checked
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

