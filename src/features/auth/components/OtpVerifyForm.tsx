import React, { useState, useRef } from "react";
import { Link } from "react-router";
import { Button } from "../../../components/ui";

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
                        <Button
                            type="submit"
                            className="w-full bg-accent hover:bg-accent/90"
                        >
                            Verify Code
                        </Button>

                        <Link to={backPath} className="block w-full">
                            <Button
                                type="button"
                                variant="secondary"
                                className="w-full"
                            >
                                Back
                            </Button>
                        </Link>
                    </div>

                    <div className="text-center text-sm pt-2">
                        <span className="text-muted-foreground">Didn't receive code? </span>
                        <Button
                            type="button"
                            variant="link"
                            onClick={() => alert("Verification code resent successfully")}
                            className="text-accent"
                        >
                            Resend Code
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};
