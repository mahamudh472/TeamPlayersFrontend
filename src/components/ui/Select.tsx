import React, { useId } from "react";
import ReactSelect, { Props as SelectProps } from "react-select";
import { Typography } from "./Typography";

export interface OptionType {
    label: string;
    value: string;
}

export interface AppSelectProps extends Omit<SelectProps<OptionType, false>, "theme"> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Select: React.FC<AppSelectProps> = ({
    label,
    error,
    helperText,
    options,
    value,
    onChange,
    placeholder,
    className = "",
    id,
    ...props
}) => {
    const defaultId = useId();
    const selectId = id || defaultId;

    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            minHeight: "42px",
            borderRadius: "8px",
            borderColor: error 
                ? "#ef4444" 
                : state.isFocused 
                    ? "var(--color-primary, #14b8a6)" 
                    : "var(--color-btn-sec-border, #e2e8f0)",
            boxShadow: state.isFocused 
                ? "0 0 0 2px rgba(20, 184, 166, 0.2)" 
                : "none",
            backgroundColor: "#ffffff",
            fontSize: "14px",
            fontWeight: "500",
            color: "var(--color-text-main, #0f172a)",
            transition: "all 0.2s",
            "&:hover": {
                borderColor: error 
                    ? "#ef4444" 
                    : "var(--color-primary, #14b8a6)",
            }
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            fontSize: "14px",
            fontWeight: "500",
            color: state.isSelected 
                ? "#ffffff" 
                : "var(--color-text-main, #0f172a)",
            backgroundColor: state.isSelected 
                ? "var(--color-primary, #14b8a6)" 
                : state.isFocused 
                    ? "var(--color-btn-sec-bg, #f8fafc)" 
                    : "#ffffff",
            cursor: "pointer",
            "&:active": {
                backgroundColor: "var(--color-primary, #14b8a6)",
            }
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: "var(--color-light-text, #94a3b8)",
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: "var(--color-text-main, #0f172a)",
        }),
    };

    return (
        <div className={`w-full flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label htmlFor={selectId} className="cursor-pointer select-none">
                    <Typography variant="body2" className="font-semibold text-text-main">
                        {label}
                    </Typography>
                </label>
            )}
            <ReactSelect
                id={selectId}
                options={options}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                styles={customStyles}
                {...props}
            />
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
};
