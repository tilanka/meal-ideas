"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MealIdea } from "../actions";

export default function SavedMeals() {
    const [savedMeals, setSavedMeals] = useState<MealIdea[]>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("savedMeals");
        if (saved) {
            try {
                setSavedMeals(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved meals", e);
            }
        }
    }, []);

    const toggleSuggestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const removeMeal = (title: string) => {
        const newMeals = savedMeals.filter((meal) => meal.title !== title);
        setSavedMeals(newMeals);
        localStorage.setItem("savedMeals", JSON.stringify(newMeals));
    };

    return (
        <div className="font-sans min-h-screen bg-gray-900 text-white">
            <main className="container mx-auto p-8">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-100">
                        Saved Meals
                    </h1>
                    <div className="flex gap-4">
                        <Link href="/shopping-list" className="text-blue-400 hover:text-blue-300 transition-colors">
                            Shopping List
                        </Link>
                        <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
                            ← Back to Generator
                        </Link>
                    </div>
                </div>

                {savedMeals.length === 0 ? (
                    <div className="text-center text-gray-400 mt-20">
                        <p className="text-xl">No saved meals yet.</p>
                        <Link href="/" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
                            Generate some ideas
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 max-w-4xl mx-auto">
                        {savedMeals.map((idea, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 rounded-lg shadow-md border border-gray-700 overflow-hidden"
                            >
                                <h3
                                    className="text-lg font-bold text-blue-400 p-4 cursor-pointer flex justify-between items-start"
                                    onClick={() => toggleSuggestion(index)}
                                >
                                    {idea.title}
                                    <span>{openIndex === index ? '−' : '+'}</span>
                                </h3>
                                {openIndex === index && (
                                    <div className="p-6 pt-0">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="text-md font-semibold text-gray-200 mb-2">Ingredients</h4>
                                                <ul className="list-disc list-inside text-gray-300">
                                                    {idea.ingredients.map((ingredient, i) => (
                                                        <li key={i}>{ingredient}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="text-md font-semibold text-gray-200 mb-2">Instructions</h4>
                                                <ol className="list-decimal list-inside text-gray-300">
                                                    {idea.instructions.map((step, i) => (
                                                        <li key={i}>{step}</li>
                                                    ))}
                                                </ol>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex justify-end">
                                            <button
                                                onClick={() => removeMeal(idea.title)}
                                                className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M3 6h18" />
                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                </svg>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
