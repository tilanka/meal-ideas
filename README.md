# Meal Planner

This is a simple meal planner application built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com/). It uses the [Google Generative AI](https://ai.google/) to generate high-protein meal ideas based on user input.

## Features

-   Enter an ingredient to get meal ideas.
-   Get three high-protein meal suggestions.
-   Each suggestion includes a title, ingredients, and preparation instructions.
-   Dark-themed, responsive UI.
-   Collapsible sections for each meal idea.

## Getting Started

### Prerequisites

-   Node.js and npm (or yarn/pnpm/bun)
-   A Google API key with the Generative AI API enabled.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Configuration

This project requires a Google API key to connect to the Gemini API.

1.  **Create a `.env.local` file** in the root directory of the project. This file is used to store local environment variables and is not checked into version control.

2.  **Add your API key** to the `.env.local` file in the following format:
    ```
    GOOGLE_API_KEY="YOUR_API_KEY"
    ```
    Replace `"YOUR_API_KEY"` with your actual Google API key.

### Running the Development Server

Once you have installed the dependencies and configured your API key, you can run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about the technologies used in this project, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [React Documentation](https://react.dev/) - learn about React.
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS.
-   [Google AI for Developers](https://ai.google.dev/) - learn about the Google Generative AI API.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
