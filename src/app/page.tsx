"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { searchMeals, MealIdea } from "./actions";
import { PageHeader } from "../components/PageHeader";
import { AccordionHeader } from "../components/AccordionHeader";
import { AccordionContainer } from "@/components/AccordionContainer";
import { CaloriesDisplay } from "@/components/CaloriesDisplay";

function SearchContent() {
    const [suggestions, setSuggestions] = useState<MealIdea[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const query = searchParams.get("q");
        if (query !== null) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHasSearched(true);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsPending(true);
            setError(null);
            searchMeals(query)
                .then((results) => {
                    setSuggestions(results);
                })
                .catch(() => {
                    setError(
                        "The service is currently unavailable. Please try again later."
                    );
                })
                .finally(() => {
                    setIsPending(false);
                });
        }
    }, [searchParams]);

    const toggleSuggestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const [bookmarkedMeals, setBookmarkedMeals] = useState<MealIdea[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("savedMeals");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setBookmarkedMeals(parsed);
            } catch (e) {
                console.error("Failed to parse saved meals", e);
            }
        }
    }, []);

    const toggleBookmark = (idea: MealIdea) => {
        setBookmarkedMeals((prev) => {
            const isAlreadyBookmarked = prev.some((m) => m.title === idea.title);
            let newBookmarks;
            if (isAlreadyBookmarked) {
                newBookmarks = prev.filter((m) => m.title !== idea.title);
            } else {
                newBookmarks = [...prev, idea];
            }
            localStorage.setItem("savedMeals", JSON.stringify(newBookmarks));
            return newBookmarks;
        });
    };

    const isBookmarked = (idea: MealIdea) => bookmarkedMeals.some((m) => m.title === idea.title);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setHasSearched(true);
        const formData = new FormData(e.currentTarget);
        const input = formData.get("input") as string;
        // Allow empty input to pass through
        const params = new URLSearchParams(searchParams);
        params.set("q", input);
        router.push(`${pathname}?${params.toString()}`);
    };

    // Determine if we should show centered or top-aligned layout
    const showCentered = !hasSearched && suggestions.length === 0;

    return (
        <div className={`flex flex-col transition-all duration-500 ease-out ${showCentered
                ? "min-h-[calc(100vh-10rem)] justify-center"
                : "min-h-0 justify-start"
            }`}>
            <form onSubmit={handleSubmit} className={`max-w-lg w-full mx-auto transition-all duration-500 ease-out ${showCentered ? "scale-100" : "scale-100"
                }`}>
                <div className="flex flex-col gap-4">
                    <label htmlFor="meal-input" className={`font-medium transition-all duration-500 ${showCentered ? "text-2xl text-center" : "text-lg"
                        }`}>
                        What do you want to eat?
                    </label>
                    <input
                        id="meal-input"
                        name="input"
                        type="text"
                        defaultValue={searchParams.get("q")?.toString()}
                        className="p-3 border border-gray-700 rounded-sm focus:ring-2 focus:border-transparent transition"
                    />
                    <Button
                        size="lg"
                        type="submit"
                        disabled={isPending}>
                        {isPending ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Getting ideas...
                            </>
                        ) : (
                            "Get ideas"
                        )}
                    </Button>
                </div>
            </form>

            {error && (
                <div className="mt-4 max-w-lg mx-auto text-red-500 bg-red-500/10 p-4 rounded-md">
                    {error}
                </div>
            )}

            {suggestions.length > 0 && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                        {suggestions.map((idea, index) => (
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
                                                <CaloriesDisplay calories={idea.totalCalories} />
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
                                                onClick={() => toggleBookmark(idea)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isBookmarked(idea)
                                                    ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                                    }`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill={isBookmarked(idea) ? "currentColor" : "none"}
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                                                </svg>
                                                <span className="sr-only">{isBookmarked(idea) ? "Saved" : "Bookmark"}</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </AccordionContainer>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Home() {
    return (
        <div className="font-sans min-h-screen">
            <main className="container mx-auto p-6">
                <PageHeader title="Meal ideas"></PageHeader>
                <Suspense fallback={<div>Loading...</div>}>
                    <SearchContent />
                </Suspense>
            </main>
        </div>
    );
}
