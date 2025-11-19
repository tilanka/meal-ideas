"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MealIdea } from "../actions";
import { PageHeader } from "../../components/PageHeader";

export default function ShoppingList() {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

    useEffect(() => {
        const saved = localStorage.getItem("savedMeals");
        if (saved) {
            try {
                const meals: MealIdea[] = JSON.parse(saved);
                const allIngredients = meals.flatMap((meal) => meal.ingredients);
                // Simple deduplication
                const uniqueIngredients = Array.from(new Set(allIngredients)).sort();
                setIngredients(uniqueIngredients);
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

    return (
        <div className="font-sans min-h-screen bg-gray-900 text-white">
            <main className="container mx-auto p-6">
                <PageHeader title="Shopping List">
                    <Link href="/saved" className="text-blue-400 hover:text-blue-300 transition-colors">
                        Saved Meals
                    </Link>
                    <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
                        Generator
                    </Link>
                </PageHeader>

                {ingredients.length === 0 ? (
                    <div className="text-center text-gray-400 mt-20">
                        <p className="text-xl">Your shopping list is empty.</p>
                        <p className="mt-2">Save some meals to see ingredients here!</p>
                        <Link href="/" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
                            Generate some ideas
                        </Link>
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-md border border-gray-700 p-6">
                        <ul className="space-y-3">
                            {ingredients.map((item, index) => (
                                <li
                                    key={index}
                                    className={`flex items-center p-3 rounded-md transition-colors cursor-pointer ${checkedItems.has(item)
                                        ? "bg-gray-700/50 text-gray-500 line-through"
                                        : "bg-gray-700 hover:bg-gray-600 text-gray-200"
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
                        <div className="mt-6 text-right text-gray-400 text-sm">
                            {checkedItems.size} of {ingredients.length} items checked
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
