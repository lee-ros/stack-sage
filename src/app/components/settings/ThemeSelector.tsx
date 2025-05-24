"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeOption {
  name: string;
  value: "light" | "dark" | "system";
  icon: string;
}

const themeOptions: ThemeOption[] = [
  {
    name: "Light",
    value: "light",
    icon: "light_mode",
  },
  {
    name: "Dark",
    value: "dark",
    icon: "dark_mode",
  },
  {
    name: "System",
    value: "system",
    icon: "settings_suggest",
  },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-row">
      {themeOptions.map((t) => (
        <button
          key={t.name}
          className={`inline-flex items-center gap-2 px-2 py-1 border-b-2 hover:cursor-pointer \
            ${t.value === theme ? "text-accent border-accent" : "border-neutral-300"}
            transition-all duration-300
            `}
          onClick={() => setTheme(t.value)}
        >
          <span className="material-symbols-outlined text-base!">{t.icon}</span>
          <span>{t.name}</span>
        </button>
      ))}
    </div>
  );
}
