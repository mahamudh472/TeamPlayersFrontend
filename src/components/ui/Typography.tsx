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
  h1: "text-4xl font-bold tracking-tight text-gray-900 dark:text-white",
  h2: "text-3xl font-semibold tracking-tight text-gray-900 dark:text-white",
  h3: "text-2xl font-semibold text-gray-900 dark:text-white",
  h4: "text-xl font-medium text-gray-900 dark:text-white",
  h5: "text-lg font-medium text-gray-900 dark:text-white",
  h6: "text-base font-medium text-gray-900 dark:text-white",
  body1: "text-base leading-7 text-gray-700 dark:text-gray-300",
  body2: "text-sm leading-6 text-gray-600 dark:text-gray-400",
  caption: "text-xs text-gray-500 dark:text-gray-500",
  subtitle1: "text-lg font-normal text-gray-500 dark:text-gray-400",
  subtitle2: "text-sm font-normal text-gray-500 dark:text-gray-400",
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
