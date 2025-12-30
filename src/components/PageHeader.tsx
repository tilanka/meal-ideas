"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Utensils, Bookmark, ShoppingCart } from "lucide-react";

interface PageHeaderProps {
    title: string;
}

const navItems = [
    { href: "/", label: "Meal Ideas", icon: Utensils },
    { href: "/saved", label: "Saved Meals", icon: Bookmark },
    { href: "/shopping-list", label: "Shopping List", icon: ShoppingCart },
];

export function PageHeader({ title }: PageHeaderProps) {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border pb-safe md:bottom-auto md:top-0 md:border-t-0 md:border-b">
            <h1 className="sr-only">{title}</h1>
            <div className="flex justify-around items-center py-2 md:justify-end md:gap-6 md:px-6 md:py-3">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex flex-col items-center gap-1 px-3 py-1 text-xs transition-colors md:flex-row md:gap-2 md:text-sm ${isActive
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <Icon className="h-5 w-5 md:h-4 md:w-4" />
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
