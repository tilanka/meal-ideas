"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { searchMeals, MealIdea } from "./actions";
import { PageLayout } from "@/components/PageLayout";
import { AccordionHeader } from "@/components/AccordionHeader";
import { AccordionContainer } from "@/components/AccordionContainer";
import { MealDetails } from "@/components/MealDetails";
import { useSavedMeals } from "@/hooks/useSavedMeals";
import { Bookmark, RefreshCw } from "lucide-react";

function SearchContent() {
    const [suggestions, setSuggestions] = useState<MealIdea[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { toggleMeal, isSaved } = useSavedMeals();

    // Fetch meals when URL query changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const query = searchParams.get("q");
        if (query !== null) {
            setHasSearched(true);
            setIsPending(true);
            setError(null);
            searchMeals(query)
                .then((results) => setSuggestions(results))
                .catch(() => setError("The service is currently unavailable. Please try again later."))
                .finally(() => setIsPending(false));
        }
    }, [searchParams]);

    const toggleSuggestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setHasSearched(true);
        const formData = new FormData(e.currentTarget);
        const input = formData.get("input") as string;
        const params = new URLSearchParams(searchParams);
        params.set("q", input);
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleRefresh = async () => {
        const query = searchParams.get("q") || "";
        const excludeMeals = suggestions.map((meal) => meal.title);
        setIsRefreshing(true);
        setError(null);
        setOpenIndex(null);
        try {
            const results = await searchMeals(query, excludeMeals);
            setSuggestions(results);
        } catch {
            setError("The service is currently unavailable. Please try again later.");
        } finally {
            setIsRefreshing(false);
        }
    };

    const showCentered = !hasSearched && suggestions.length === 0;

    return (
        <div className={`flex flex-col transition-all duration-500 ease-out ${showCentered ? "min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-6rem)] justify-center" : "min-h-0 justify-start"
            }`}>
            <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto transition-all duration-500 ease-out">
                <div className="flex flex-col gap-4">
                    <label htmlFor="meal-input" className={`font-medium transition-all duration-500 ${showCentered ? "text-2xl text-center" : "text-lg"
                        }`}>
                        What do you want to eat?
                    </label>
                    <input
                        id="meal-input"
                        name="input"
                        type="text"
                        placeholder="e.g. spicy chicken, pasta, a salad..."
                        defaultValue={searchParams.get("q")?.toString()}
                        className="p-4 bg-muted/50 border-0 rounded-xl text-base placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:bg-muted/70 transition-all duration-200"
                    />
                    <Button size="lg" type="submit" disabled={isPending}>
                        {isPending ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Getting ideas...
                            </>
                        ) : "Get ideas"}
                    </Button>
                </div>
            </form>

            {error && (
                <div className="mt-6 max-w-lg mx-auto text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                    {error}
                </div>
            )}

            {suggestions.length > 0 && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 gap-4">
                        {suggestions.map((idea, index) => (
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
                                                onClick={() => toggleMeal(idea)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 ${isSaved(idea)
                                                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                                                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                                                    }`}
                                            >
                                                <Bookmark
                                                    className="h-4 w-4"
                                                    fill={isSaved(idea) ? "currentColor" : "none"}
                                                />
                                                <span className="text-sm">{isSaved(idea) ? "Saved" : "Save"}</span>
                                            </button>
                                        }
                                    />
                                )}
                            </AccordionContainer>
                        ))}
                    </div>
                    <div className="flex justify-center mt-6">
                        <Button
                            variant="outline"
                            onClick={handleRefresh}
                            disabled={isRefreshing || isPending}
                            className="gap-2"
                        >
                            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                            {isRefreshing ? "Refreshing..." : "Refresh"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Home() {
    return (
        <PageLayout title="Meal ideas">
            <Suspense fallback={<div>Loading...</div>}>
                <SearchContent />
            </Suspense>
        </PageLayout>
    );
}
