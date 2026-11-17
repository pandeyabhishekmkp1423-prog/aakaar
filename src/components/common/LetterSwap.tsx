import React from "react";

interface LetterSwapProps {
  label: string;
  className?: string;
  flipClassName?: string;
  staggerMs?: number;
  durationMs?: number;
  isActive?: boolean;
}

/**
 * LetterSwap - High-performance 3D Letter Roll / Swap Animation Component
 * Creates an ultra-smooth cascading 3D letter flip on parent .group hover.
 * Retains full accessibility (aria-label on wrapper, aria-hidden on split letters).
 */
export function LetterSwap({
  label,
  className = "",
  flipClassName = "text-lime",
  staggerMs = 20,
  durationMs = 280,
  isActive = false,
}: LetterSwapProps) {
  const characters = label.split("");

  return (
    <span
      className={`inline-flex items-center overflow-hidden leading-none select-none relative ${className}`}
      aria-label={label}
    >
      {characters.map((char, idx) => {
        if (char === " ") {
          return (
            <span key={idx} className="inline-block w-[0.28em]" aria-hidden="true">
              &nbsp;
            </span>
          );
        }

        return (
          <span
            key={idx}
            className="letter-swap-unit relative inline-block overflow-hidden"
            style={{
              perspective: "500px",
              transformStyle: "preserve-3d",
            }}
            aria-hidden="true"
          >
            {/* Front primary letter */}
            <span
              className={`letter-swap-front inline-block transition-all ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                isActive ? "text-lime font-bold" : ""
              }`}
              style={{
                transitionDuration: `${durationMs}ms`,
                transitionDelay: `${idx * staggerMs}ms`,
              }}
            >
              {char}
            </span>

            {/* Back flip-in 3D letter */}
            <span
              className={`letter-swap-back absolute inset-0 inline-block transition-all ease-[cubic-bezier(0.2,0.8,0.2,1)] ${flipClassName}`}
              style={{
                transitionDuration: `${durationMs}ms`,
                transitionDelay: `${idx * staggerMs}ms`,
              }}
            >
              {char}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default LetterSwap;
