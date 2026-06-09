import React, { useState, useRef } from "react";
import { Link } from "react-router";

interface OtpVerifyFormProps {
    title: string;
    description: string;
    onSubmit: (code: string) => void;
    backPath?: string;
}

export const OtpVerifyForm: React.FC<OtpVerifyFormProps> = ({
    title,
    description,
    onSubmit,
    backPath = "/login",
}) => {
    const [code, setCode] = useState<string[]>(Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return; // Only allow digits

        const newCode = [...code];
        newCode[index] = value.substring(value.length - 1);
        setCode(newCode);

        // Move to next input if filled
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fullCode = code.join("");
        if (fullCode.length < 6) {
            alert("Please enter the full 6-digit code");
            return;
        }
        onSubmit(fullCode);
    };

    return (
        <>
            <div data-slot="card-header" className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 pt-2 text-center">
                <div className="flex justify-center mb-4">
                    <img src="/logo.png" alt="NoahMoore Logo" className="h-12 w-auto object-contain" />
                </div>
                <h4 data-slot="card-title" className="leading-none text-xl font-bold">{title}</h4>
                <p data-slot="card-description" className="text-muted-foreground text-sm">{description}</p>
            </div>
            <div data-slot="card-content" className="[&:last-child]:pb-6 mt-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-between gap-2">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                className="w-12 h-12 text-center text-lg font-bold border border-btn-sec-border rounded-lg bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-text-main"
                            />
                        ))}
                    </div>

                    <div className="space-y-3">
                        <button
                            data-slot="button"
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-white h-9 px-4 py-2 w-full bg-accent hover:bg-accent/90 cursor-pointer"
                            type="submit"
                        >
                            Verify Code
                        </button>

                        <Link to={backPath} className="block w-full">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] h-9 px-4 py-2 w-full border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 cursor-pointer"
                            >
                                Back
                            </button>
                        </Link>
                    </div>

                    <div className="text-center text-sm pt-2">
                        <span className="text-muted-foreground">Didn't receive code? </span>
                        <button
                            type="button"
                            onClick={() => alert("Verification code resent successfully")}
                            className="text-accent hover:underline font-semibold bg-transparent border-none cursor-pointer"
                        >
                            Resend Code
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
