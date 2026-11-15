"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("maple-theme");
    const isDark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setTheme(isDark ? "dark" : "light");
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
        className="p-2 rounded-lg border border-line text-secondary hover:text-ink hover:bg-mist transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
      >
        <span className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} colour scheme`}
      className="p-2 rounded-lg border border-line text-secondary hover:text-ink hover:bg-mist transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
      id="theme-toggle-btn"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-[#FF7A5F]" aria-hidden="true" />
      ) : (
        <Moon className="w-5 h-5 text-primary-spruce" aria-hidden="true" />
      )}
    </button>
  );
}
