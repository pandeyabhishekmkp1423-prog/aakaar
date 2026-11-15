import React from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  to?: string;
  children?: React.ReactNode;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, to, children, className, onClick, ...props }, ref) => {
    const navigate = useNavigate();
    const location = useLocation();
    const rawTarget = to || href || "/";

    // External links, protocols
    if (
      rawTarget.startsWith("http://") ||
      rawTarget.startsWith("https://") ||
      rawTarget.startsWith("mailto:") ||
      rawTarget.startsWith("tel:")
    ) {
      return (
        <a ref={ref} href={rawTarget} className={className} onClick={onClick} {...props}>
          {children}
        </a>
      );
    }

    // Clean internal section scrolling: never appends '#' to the browser address bar
    if (rawTarget.includes("#")) {
      const [pathPart, sectionId] = rawTarget.split("#");
      const normalizedPath = pathPart === "" ? "/" : pathPart;

      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) onClick(e);
        if (e.defaultPrevented) return;
        e.preventDefault();

        if (sectionId) {
          if (location.pathname === normalizedPath) {
            const el = document.getElementById(sectionId);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          } else {
            navigate(normalizedPath, { state: { scrollTo: sectionId } });
          }
        } else {
          if (location.pathname !== normalizedPath) {
            navigate(normalizedPath);
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      };

      return (
        <a
          ref={ref}
          href={normalizedPath}
          className={className}
          onClick={handleClick}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <RouterLink ref={ref} to={rawTarget} className={className} onClick={onClick} {...props}>
        {children}
      </RouterLink>
    );
  }
);

Link.displayName = "Link";

export default Link;

