import Link from "next/link";
import React from "react";

interface PageHeaderProps {
    title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
    return (
        <div className="flex justify-end items-center mb-10">
            <h1 className="text-2xl font-bold text-gray-100 sr-only">{title}</h1>
            <div className="flex gap-4 text-sm">
                 <Link href="/">
                    Meal ideas
                </Link>
                <Link href="/saved">
                    Saved Meals
                </Link>
                <Link href="/shopping-list">
                    Shopping List
                </Link>
                {/* {children} */}
            </div>
        </div>
    );
}
