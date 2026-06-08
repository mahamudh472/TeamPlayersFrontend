import React from "react";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "caption"
  | "subtitle1"
  | "subtitle2";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  component?: React.ElementType;
}

const variantMapping: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body1: "p",
  body2: "p",
  caption: "span",
  subtitle1: "p",
  subtitle2: "p",
};

const classMapping: Record<TypographyVariant, string> = {
  h1: "text-5xl md:text-6xl font-bold tracking-tight text-text-main mb-6",
  h2: "text-3xl font-semibold tracking-tight text-text-main",
  h3: "text-2xl font-semibold text-text-main",
  h4: "text-xl font-medium text-text-main",
  h5: "text-lg font-medium text-text-main",
  h6: "text-base font-medium text-text-main",
  body1: "text-base leading-7 text-text-main",
  body2: "text-sm leading-6 text-muted-text",
  caption: "text-xs text-light-text",
  subtitle1: "text-lg font-normal text-muted-text",
  subtitle2: "text-sm font-normal text-light-text",
};

export const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  component,
  className = "",
  children,
  ...props
}) => {
  const Component = component || variantMapping[variant];
  const variantClasses = variantClassMapping(variant);

  return (
    <Component className={`${variantClasses} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
};

function variantClassMapping(variant: TypographyVariant): string {
  return classMapping[variant] || "";
}
