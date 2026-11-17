import React from "react";
import Link from "@/components/common/Link";
import { ArrowUpRight, ArrowRight, Loader2 } from "lucide-react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "secondary-dark"
  | "secondary-light"
  | "text-link";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  loading?: boolean;
  href?: string;
  to?: string;
  arrow?: boolean | "up-right" | "right";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      pill = false,
      loading = false,
      href,
      to,
      arrow = false,
      icon,
      children,
      className = "",
      disabled = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    // Normalise variant
    const resolvedVariant =
      variant === "secondary-dark" || variant === "secondary-light"
        ? "secondary"
        : variant;

    // Size classes (ensuring minimum 44px touch target)
    const sizeClasses: Record<ButtonSize, string> = {
      sm: "min-h-[44px] px-4 py-2 text-[13px]",
      md: "min-h-[48px] px-6 py-3.5 text-[15px]",
      lg: "min-h-[54px] px-8 py-4 text-[16px]",
    };

    // Variant classes mapped to master theme
    const variantClasses: Record<string, string> = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      "text-link": "ad-text-link",
    };

    const isActuallyDisabled = disabled || loading;

    const baseClass =
      resolvedVariant === "text-link"
        ? "ad-text-link"
        : "btn-base font-semibold";

    const combinedClassName = [
      baseClass,
      variantClasses[resolvedVariant] || "btn-primary",
      resolvedVariant !== "text-link" ? sizeClasses[size] : "",
      pill ? "rounded-full !btn-pill" : "",
      isActuallyDisabled ? "btn-disabled opacity-45 cursor-not-allowed pointer-events-none" : "",
      "group select-none",
      className,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();

    const renderArrow = () => {
      if (!arrow || loading) return null;
      if (arrow === "right" || arrow === true) {
        return (
          <ArrowRight
            className="w-4 h-4 ml-1.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        );
      }
      return (
        <ArrowUpRight
          className="w-4 h-4 ml-1.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      );
    };

    const renderLeadingIcon = () => {
      if (loading) {
        return (
          <Loader2
            className="w-4 h-4 mr-1.5 shrink-0 animate-spin text-current"
            aria-hidden="true"
          />
        );
      }
      if (icon) {
        return <span className="shrink-0 mr-1.5" aria-hidden="true">{icon}</span>;
      }
      return null;
    };

    const content = (
      <>
        {renderLeadingIcon()}
        <span className="relative z-10 leading-none">{children}</span>
        {renderArrow()}
      </>
    );

    const targetUrl = href || to;

    if (targetUrl && !isActuallyDisabled) {
      return (
        <Link
          href={targetUrl}
          className={combinedClassName}
          aria-disabled={isActuallyDisabled}
          target={props.target}
          rel={props.rel}
          onClick={props.onClick as React.MouseEventHandler<HTMLAnchorElement>}
          role="button"
        >
          {content}
        </Link>
      );
    }

    if (targetUrl && isActuallyDisabled) {
      return (
        <span
          className={combinedClassName}
          aria-disabled="true"
          role="button"
          tabIndex={-1}
        >
          {content}
        </span>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={isActuallyDisabled}
        aria-busy={loading}
        className={combinedClassName}
        onClick={props.onClick as React.MouseEventHandler<HTMLButtonElement>}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
