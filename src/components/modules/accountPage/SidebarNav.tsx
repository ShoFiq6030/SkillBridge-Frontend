"use client";

import { User, Lock, GraduationCap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  activeSection: string;
  isTutor: boolean;
}

export function SidebarNav({ activeSection="profile", isTutor }: SidebarNavProps) {
  const navItems = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
    {
      id: "password",
      label: "Change Password",
      icon: Lock,
    },
  ];

  if (isTutor) {
    navItems.push({
      id: "tutor-profile",
      label: "Tutor Profile",
      icon: GraduationCap,
    });
  }

  return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <Link
            key={item.id}
            href={`/account?section=${item.id}`}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}