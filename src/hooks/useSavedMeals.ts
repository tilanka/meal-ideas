"use client";

import { useState, useEffect, useCallback } from "react";
import { MealIdea } from "@/app/actions";

const STORAGE_KEY = "savedMeals";

export function useSavedMeals() {
    const [savedMeals, setSavedMeals] = useState<MealIdea[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setSavedMeals(parsed);
            } catch (e) {
                console.error("Failed to parse saved meals", e);
            }
        }
    }, []);

    // Add a meal to saved list
    const addMeal = useCallback((meal: MealIdea) => {
        setSavedMeals((prev) => {
            if (prev.some((m) => m.title === meal.title)) {
                return prev; // Already saved
            }
            const newMeals = [...prev, meal];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newMeals));
            return newMeals;
        });
    }, []);

    // Remove a meal from saved list
    const removeMeal = useCallback((title: string) => {
        setSavedMeals((prev) => {
            const newMeals = prev.filter((m) => m.title !== title);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newMeals));
            return newMeals;
        });
    }, []);

    // Toggle a meal's saved status
    const toggleMeal = useCallback((meal: MealIdea) => {
        setSavedMeals((prev) => {
            const isAlreadySaved = prev.some((m) => m.title === meal.title);
            const newMeals = isAlreadySaved
                ? prev.filter((m) => m.title !== meal.title)
                : [...prev, meal];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newMeals));
            return newMeals;
        });
    }, []);

    // Check if a meal is saved
    const isSaved = useCallback(
        (meal: MealIdea) => savedMeals.some((m) => m.title === meal.title),
        [savedMeals]
    );

    return {
        savedMeals,
        addMeal,
        removeMeal,
        toggleMeal,
        isSaved,
    };
}
