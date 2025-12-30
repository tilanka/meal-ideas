"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Utensils, Bookmark, ShoppingCart } from "lucide-react";

interface PageHeaderProps {
    title: string;
}

const navItems = [
    { href: "/", label: "Meal Ideas", icon: Utensils },
    { href: "/saved", label: "Saved", icon: Bookmark },
    { href: "/shopping-list", label: "Shopping", icon: ShoppingCart },
];

export function PageHeader({ title }: PageHeaderProps) {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border/50 pb-safe md:bottom-auto md:top-0 md:border-t-0 md:border-b">
            <h1 className="sr-only">{title}</h1>
            <div className="flex justify-around items-center py-2 md:justify-end md:gap-2 md:px-6 md:py-3">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-xs transition-all duration-200 md:flex-row md:gap-2 md:text-sm md:px-4 md:py-2 ${isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {isActive && (
                                <span className="absolute inset-0 bg-primary/10 rounded-xl" />
                            )}
                            <Icon className={`relative h-5 w-5 md:h-4 md:w-4 transition-transform duration-200 ${isActive ? "scale-110" : ""
                                }`} />
                            <span className="relative">{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
