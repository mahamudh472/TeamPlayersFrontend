import React, { useState } from "react";
import { Link } from "react-router";
import { Input } from "../../../components/ui";

interface ForgotPasswordFormProps {
    onSubmit: (email: string) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(email);
    };

    return (
        <>
            <div data-slot="card-header" className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 pt-2 text-center">
                <div className="flex justify-center mb-4">
                    <img src="/logo.png" alt="NoahMoore Logo" className="h-12 w-auto object-contain" />
                </div>
                <h4 data-slot="card-title" className="leading-none text-xl font-bold text-text-main">Forgot Password?</h4>
                <p data-slot="card-description" className="text-muted-foreground text-sm">Enter your email address and we'll send you a link to reset your password</p>
            </div>
            <div data-slot="card-content" className="[&:last-child]:pb-6 mt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Email Address"
                        type="email"
                        id="email"
                        placeholder="you@agency.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        data-slot="button"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-white h-9 px-4 py-2 w-full bg-accent hover:bg-accent/90 cursor-pointer"
                        type="submit"
                    >
                        Send Reset Link
                    </button>
                    <Link to="/login" className="block w-full">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] h-9 px-4 py-2 w-full border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 cursor-pointer"
                        >
                            Back to Login
                        </button>
                    </Link>
                </form>
            </div>
        </>
    );
};
