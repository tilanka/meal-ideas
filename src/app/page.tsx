"use client";

import { useActionState, useState } from "react";
import { getSuggestions, MealIdea } from "./actions";

export default function Home() {
  const initialState: { suggestions: MealIdea[] } = {
    suggestions: [],
  };

  const [state, formAction, isPending] = useActionState(
    getSuggestions,
    initialState
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSuggestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="font-sans min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-gray-100 mb-10">
          Meal ideas
        </h1>

        <form action={formAction} className="max-w-lg mx-auto">
          <div className="flex flex-col gap-4">
            <label htmlFor="meal-input" className="text-lg font-medium text-gray-300">
              What do you want to eat?
            </label>
            <input
              id="meal-input"
              name="input"
              type="text"
              placeholder="e.g. something spicy with chicken"
              className="p-3 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-500"
              required
            />
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors shadow flex items-center justify-center"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Getting suggestions...
                </>
              ) : (
                "Get suggestions"
              )}
            </button>
          </div>
        </form>

        {state.suggestions.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">
              Suggestions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              {state.suggestions.map((idea, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg shadow-md border border-gray-700 overflow-hidden"
                >
                  <h3
                    className="text-lg font-bold text-blue-400 p-6 cursor-pointer flex justify-between items-center"
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
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
