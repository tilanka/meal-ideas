"use client";

import { useState } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { useSavedMeals } from "@/hooks/useSavedMeals";
import { Check } from "lucide-react";

export default function ShoppingList() {
    const { savedMeals } = useSavedMeals();
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

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

    const allIngredients = savedMeals.flatMap((meal) => meal.ingredients);
    const uniqueIngredients = Array.from(new Set(allIngredients));

    return (
        <PageLayout title="Shopping List">
            {savedMeals.length === 0 ? (
                <div className="text-center mt-20">
                    <p className="text-xl">Your shopping list is empty.</p>
                    <p className="mt-2">Save some meals to see ingredients here!</p>
                    <Link href="/" className="mt-4 inline-block">
                        Generate some ideas
                    </Link>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto shadow-md p-6">
                    <div className="space-y-6">
                        {savedMeals.map((meal) => (
                            <div key={meal.title}>
                                <h3 className="text-md font-semibold mb-2">{meal.title}</h3>
                                <ul className="space-y-3">
                                    {meal.ingredients.map((item, index) => (
                                        <li
                                            key={index}
                                            className={`flex items-center rounded-md transition-colors cursor-pointer p-1 ${checkedItems.has(item)
                                                    ? "line-through"
                                                    : "hover:bg-gray-800"
                                                }`}
                                            onClick={() => toggleItem(item)}
                                        >
                                            <div className={`w-5 h-5 rounded border mr-4 flex items-center justify-center transition-colors ${checkedItems.has(item)
                                                    ? "bg-blue-600 border-blue-600"
                                                    : "border-gray-500"
                                                }`}>
                                                {checkedItems.has(item) && (
                                                    <Check className="h-3.5 w-3.5 text-white" />
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
        </PageLayout>
    );
}
