import React, { useState } from "react";
import { Link } from "react-router";
import { Input, Button } from "../../../components/ui";

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
                    <Button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent/90"
                    >
                        Send OTP
                    </Button>
                    <Link to="/login" className="block w-full">
                        <Button
                            type="button"
                            variant="secondary"
                            className="w-full"
                        >
                            Back to Login
                        </Button>
                    </Link>
                </form>
            </div>
        </>
    );
};
