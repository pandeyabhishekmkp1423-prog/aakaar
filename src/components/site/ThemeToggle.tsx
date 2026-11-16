"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("maple-theme");
    const isDark =
      stored === "dark" ||
      (!stored && (document.documentElement.classList.contains("dark") || window.matchMedia("(prefers-color-scheme: dark)").matches));
    
    setTheme(isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("maple-theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  if (!mounted) {
    return (
      <button
        aria-label="Toggle colour scheme"
        className="p-2 rounded-xl border border-line text-secondary hover:text-ink transition-all min-w-[42px] min-h-[42px] flex items-center justify-center opacity-70"
      >
        <span className="w-4 h-4 rounded-full bg-current opacity-20" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light day" : "night dark"} mode`}
      title={`Switch to ${theme === "dark" ? "Light / Day" : "Dark / Night"} Mode`}
      className="relative p-2 rounded-xl border border-line hover:border-[#AEDD00] transition-all min-w-[42px] min-h-[42px] flex items-center justify-center cursor-pointer group shadow-2xs hover:shadow-sm"
      id="theme-toggle-btn"
    >
      {theme === "dark" ? (
        <Sun className="w-4.5 h-4.5 text-[#B9F000] transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
      ) : (
        <Moon className="w-4.5 h-4.5 text-[#151A0C] transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
