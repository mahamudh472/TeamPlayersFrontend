import React, { useId } from "react";
import { Typography } from "./Typography";
import { LucideIcon } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  error?: string;
  helperText?: string;
  prefixIcon?: LucideIcon;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = "text", error, helperText, prefixIcon: PrefixIcon, className = "", ...props }, ref) => {
    const defaultId = useId();
    const id = props.id || defaultId;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="cursor-pointer select-none">
            <Typography variant="body2" className="font-semibold text-text-main">
              {label}
            </Typography>
          </label>
        )}
        <div className="relative flex items-center">
          {PrefixIcon && (
            <div className="absolute left-3.5 text-light-text pointer-events-none flex items-center justify-center">
              <PrefixIcon className="w-4.5 h-4.5" />
            </div>
          )}
          <input
            id={id}
            type={type}
            ref={ref}
            className={`
              w-full py-2.5 rounded-lg border text-sm font-medium text-text-main transition-all duration-200 outline-none
              bg-white
              placeholder:text-light-text
              focus:ring-2 focus:ring-primary/20
              disabled:bg-btn-sec-bg disabled:text-light-text disabled:cursor-not-allowed
              ${PrefixIcon ? "pl-10.5 pr-3.5" : "px-3.5"}
              ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-btn-sec-border focus:border-primary focus:ring-primary/20"
              }
              ${className}
            `.trim()}
            {...props}
          />
        </div>
        {error ? (
          <Typography variant="caption" className="text-red-600 font-medium">
            {error}
          </Typography>
        ) : (
          helperText && (
            <Typography variant="caption" className="text-light-text">
              {helperText}
            </Typography>
          )
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
