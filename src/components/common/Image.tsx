import React from "react";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  fill?: boolean;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt = "", width, height, priority, fill, className, style, ...props }, ref) => {
    const combinedStyle: React.CSSProperties = {
      ...(fill
        ? {
            position: "absolute",
            height: "100%",
            width: "100%",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            objectFit: "cover",
          }
        : {}),
      ...style,
    };

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        className={className}
        style={combinedStyle}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;

