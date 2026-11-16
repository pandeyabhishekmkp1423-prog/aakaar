import React from "react";
import Link from "@/components/common/Link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export type ButtonVariant =
  | "primary"
  | "secondary-dark"
  | "secondary-light"
  | "secondary"
  | "ghost"
  | "text-link";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
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
      href,
      to,
      arrow = false,
      icon,
      children,
      className = "",
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    // Size classes
    const sizeClasses = {
      sm: "min-h-[38px] px-4 py-1.5 text-xs",
      md: "min-h-[46px] px-6 py-2.5 text-sm",
      lg: "min-h-[52px] px-8 py-3.5 text-base",
    }[size];

    // Variant classes mapped to the Master Brand Design System
    const variantClasses: Record<ButtonVariant, string> = {
      primary: "btn-primary",
      "secondary-dark": "btn-secondary-dark",
      "secondary-light": "btn-secondary-light",
      secondary: "btn-secondary",
      ghost: "ad-button-ghost",
      "text-link": "ad-text-link",
    };

    const combinedClassName = `${variantClasses[variant] || "btn-primary"} ${
      variant !== "text-link" ? sizeClasses : ""
    } ${className}`.trim();

    const renderArrow = () => {
      if (!arrow) return null;
      if (arrow === "right") {
        return <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />;
      }
      return <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />;
    };

    const content = (
      <>
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {renderArrow()}
      </>
    );

    const targetUrl = href || to;

    if (targetUrl) {
      return (
        <Link
          href={targetUrl}
          className={combinedClassName}
          aria-disabled={disabled}
          onClick={disabled ? (e) => e.preventDefault() : (props.onClick as React.MouseEventHandler<HTMLAnchorElement>)}
          target={props.target}
          rel={props.rel}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={combinedClassName}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
