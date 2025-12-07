"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MealIdea } from "../actions";
import { PageHeader } from "../../components/PageHeader";
import { AccordionHeader } from "../../components/AccordionHeader";
import { AccordionContainer } from "@/components/AccordionContainer";
import { CaloriesDisplay } from "@/components/CaloriesDisplay";

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
        <div className="font-sans min-h-screen">
            <main className="container mx-auto p-6">
                <PageHeader title="Saved Meals">
                </PageHeader>

                {savedMeals.length === 0 ? (
                    <div className="text-center mt-20">
                        <p className="text-xl">No saved meals yet.</p>
                        <Link href="/" className="mt-4 inline-block">
                            Generate some ideas
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 max-w-4xl mx-auto">
                        {savedMeals.map((idea, index) => (
                            <AccordionContainer key={index}>
                                <AccordionHeader
                                    title={idea.title}
                                    isOpen={openIndex === index}
                                    onClick={() => toggleSuggestion(index)}
                                />
                                {openIndex === index && (
                                    <div className="p-6 pt-0">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                {idea.totalCalories && (
                                                    <CaloriesDisplay calories={idea.totalCalories} />
                                                )}
                                                <h4 className="text-md font-semibold mb-2">Ingredients</h4>
                                                <ul className="list-disc list-inside">
                                                    {idea.ingredients.map((ingredient, i) => (
                                                        <li key={i}>{ingredient}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="text-md font-semibold mb-2">Instructions</h4>
                                                <ol className="list-decimal list-inside">
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
                                                <span className="sr-only">Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                )
                                }
                            </AccordionContainer >
                        ))}
                    </div >
                )}
            </main >
        </div >
    );
}
