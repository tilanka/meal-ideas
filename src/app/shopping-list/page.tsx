"use client";

import { useState } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { useSavedMeals } from "@/hooks/useSavedMeals";
import { Check, ShoppingBag } from "lucide-react";

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
                    <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-xl text-muted-foreground">Your shopping list is empty</p>
                    <p className="mt-2 text-sm text-muted-foreground/70">Save some meals to see ingredients here!</p>
                    <Link
                        href="/"
                        className="mt-6 inline-flex items-center gap-2 text-primary hover:underline"
                    >
                        Generate some ideas →
                    </Link>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto">
                    <div className="space-y-8">
                        {savedMeals.map((meal) => (
                            <div key={meal.title} className="bg-card/50 rounded-xl p-5 backdrop-blur-sm">
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                                    {meal.title}
                                </h3>
                                <ul className="space-y-2">
                                    {meal.ingredients.map((item, index) => {
                                        const isChecked = checkedItems.has(item);
                                        return (
                                            <li
                                                key={index}
                                                className={`flex items-center gap-3 rounded-lg p-2 cursor-pointer transition-all duration-200 ${isChecked
                                                        ? "text-muted-foreground"
                                                        : "hover:bg-muted/50"
                                                    }`}
                                                onClick={() => toggleItem(item)}
                                            >
                                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${isChecked
                                                        ? "bg-primary border-primary"
                                                        : "border-muted-foreground/30"
                                                    }`}>
                                                    {isChecked && (
                                                        <Check className="h-3 w-3 text-primary-foreground" />
                                                    )}
                                                </div>
                                                <span className={`text-sm transition-all duration-200 ${isChecked ? "line-through" : ""
                                                    }`}>
                                                    {item}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-center text-muted-foreground text-sm">
                        {checkedItems.size} of {uniqueIngredients.length} items checked
                    </div>
                </div>
            )}
        </PageLayout>
    );
}
