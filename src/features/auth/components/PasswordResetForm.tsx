import React, { useState } from "react";
import { Link } from "react-router";
import { Input } from "../../../components/ui";

interface PasswordResetFormProps {
    onSubmit: (password: string) => void;
}

export const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onSubmit }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        onSubmit(password);
    };

    return (
        <>
            <div data-slot="card-header" className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 pt-2 text-center">
                <div className="flex justify-center mb-4">
                    <img src="/logo.png" alt="NoahMoore Logo" className="h-12 w-auto object-contain" />
                </div>
                <h4 data-slot="card-title" className="leading-none text-xl font-bold text-text-main">Reset Password</h4>
                <p data-slot="card-description" className="text-muted-foreground text-sm">Set a new strong password for your account</p>
            </div>
            <div data-slot="card-content" className="[&:last-child]:pb-6 mt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="New Password"
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        label="Confirm New Password"
                        type="password"
                        id="confirmPassword"
                        placeholder="••••••••"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        data-slot="button"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-white h-9 px-4 py-2 w-full bg-accent hover:bg-accent/90 cursor-pointer"
                        type="submit"
                    >
                        Reset Password
                    </button>
                    <div className="text-center text-sm pt-2">
                        <Link className="text-accent hover:underline font-semibold" to="/login">Back to Login</Link>
                    </div>
                </form>
            </div>
        </>
    );
};
