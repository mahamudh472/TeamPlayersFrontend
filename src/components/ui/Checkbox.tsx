import React, { useId } from "react";
import { Typography } from "./Typography";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = "", ...props }, ref) => {
    const defaultId = useId();
    const id = props.id || defaultId;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <input
            id={id}
            type="checkbox"
            ref={ref}
            className={`
              w-4.5 h-4.5 rounded border border-btn-sec-border text-primary focus:ring-primary/20 focus:ring-2
              accent-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-150
              ${className}
            `.trim()}
            {...props}
          />
          {label && (
            <label htmlFor={id} className="cursor-pointer select-none">
              <Typography variant="body2" className="font-semibold text-text-main">
                {label}
              </Typography>
            </label>
          )}
        </div>
        {error && (
          <Typography variant="caption" className="text-red-600 font-medium pl-7.5">
            {error}
          </Typography>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
