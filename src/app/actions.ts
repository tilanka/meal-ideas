"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is not defined in the environment.");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export interface MealIdea {
  title: string;
  ingredients: string[];
  instructions: string[];
  totalCalories?: string;
}

export async function searchMeals(input: string, excludeMeals: string[] = []): Promise<MealIdea[]> {
  console.log("Generating meal ideas for input:", input);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  let promptText = input;
  if (!input || input.trim() === "") {
    promptText = "popular high-protein meal ideas";
  }

  const excludeClause = excludeMeals.length > 0
    ? `Do NOT include any of these meals: ${excludeMeals.join(", ")}.`
    : "";

  const prompt = `
    Give me five ${promptText}.
    ${excludeClause}
    Ensure all units are metric and the ingredients and terminology are localised to Australia.
    Return the ideas as a JSON array, where each object has the following structure:
    {
      "title": "Meal Title",
      "ingredients": ["Ingredient 1", "Ingredient 2"],
      "instructions": ["Step 1", "Step 2"],
      "totalCalories": "Total calories"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log("Gemini API response:", text);
    // Clean the response to ensure it's valid JSON
    const cleanedText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error calling Gemini API or parsing JSON:", error);
    throw new Error("Failed to generate meal ideas. Please try again later.");
  }
}

export async function getSuggestions(
  previousState: { suggestions: MealIdea[] },
  formData: FormData
): Promise<{ suggestions: MealIdea[] }> {
  const input = formData.get("input") as string;
  if (!input) {
    return { suggestions: [] };
  }
  const suggestions = await searchMeals(input);
  return { suggestions };
}
