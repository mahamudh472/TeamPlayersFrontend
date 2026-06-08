import React from "react";

export interface TabOption {
    label: string;
    value: string;
}

interface TabsProps {
    options: TabOption[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
    options,
    value,
    onChange,
    className = "",
}) => {
    return (
        <div className={`bg-slate-100/80 text-muted-text h-10 w-fit items-center justify-center rounded-xl p-[3px] flex gap-1 ${className}`.trim()}>
            {options.map((opt) => {
                const isActive = opt.value === value;
                return (
                    <button
                        key={opt.value}
                        type="button"
                        onClick={() => onChange(opt.value)}
                        className={`inline-flex h-full items-center justify-center gap-1.5 rounded-sm px-4 py-1.5 text-sm font-medium transition-all cursor-pointer ${isActive
                            ? "bg-white text-text-main shadow-xs"
                            : "hover:text-text-main text-muted-text"
                            }`}
                    >
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
};
