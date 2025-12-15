"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, GraduationCap, User, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  userRole?: string;
}

export function BottomNavigation({ userRole = "ASSISTANT" }: BottomNavigationProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Home, label: "Accueil" },
    { href: "/cabine", icon: Sparkles, label: "Cabine" },
    { href: "/formation", icon: GraduationCap, label: "Formation" },
    ...(userRole === "MANAGER" || userRole === "ADMIN"
      ? [{ href: "/manager", icon: BarChart3, label: "Manager" }]
      : []),
    { href: "/profil", icon: User, label: "Profil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-colors",
                isActive
                  ? "text-[#1B4F72]"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
