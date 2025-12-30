"use client";

import { useState } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { AccordionHeader } from "@/components/AccordionHeader";
import { AccordionContainer } from "@/components/AccordionContainer";
import { MealDetails } from "@/components/MealDetails";
import { useSavedMeals } from "@/hooks/useSavedMeals";
import { Trash2, Bookmark } from "lucide-react";

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
                    <Bookmark className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-xl text-muted-foreground">No saved meals yet</p>
                    <p className="mt-2 text-sm text-muted-foreground/70">Bookmark some meals to see them here!</p>
                    <Link
                        href="/"
                        className="mt-6 inline-flex items-center gap-2 text-primary hover:underline"
                    >
                        Generate some ideas →
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
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 bg-red-500/10 text-red-400 hover:bg-red-500/20 active:scale-95"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="text-sm">Remove</span>
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
