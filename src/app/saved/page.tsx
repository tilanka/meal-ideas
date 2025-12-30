"use client";

import { useState } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { AccordionHeader } from "@/components/AccordionHeader";
import { AccordionContainer } from "@/components/AccordionContainer";
import { MealDetails } from "@/components/MealDetails";
import { useSavedMeals } from "@/hooks/useSavedMeals";
import { Trash2 } from "lucide-react";

export default function SavedMeals() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const { savedMeals, removeMeal } = useSavedMeals();

    const toggleSuggestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <PageLayout title="Saved Meals">
            {savedMeals.length === 0 ? (
                <div className="text-center mt-20">
                    <p className="text-xl">No saved meals yet.</p>
                    <Link href="/" className="mt-4 inline-block">
                        Generate some ideas
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
                    {savedMeals.map((idea, index) => (
                        <AccordionContainer key={index}>
                            <AccordionHeader
                                title={idea.title}
                                isOpen={openIndex === index}
                                onClick={() => toggleSuggestion(index)}
                            />
                            {openIndex === index && (
                                <MealDetails
                                    meal={idea}
                                    actionButton={
                                        <button
                                            onClick={() => removeMeal(idea.title)}
                                            className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                            <span className="sr-only">Remove</span>
                                        </button>
                                    }
                                />
                            )}
                        </AccordionContainer>
                    ))}
                </div>
            )}
        </PageLayout>
    );
}
