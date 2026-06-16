import React, { useState } from "react";
import { Link } from "react-router";
import { Input, Button } from "../../../components/ui";
import { useToast } from "../../../shared/context/ToastContext";

interface PasswordResetFormProps {
    onSubmit: (password: string) => void;
}

export const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onSubmit }) => {
    const { toast } = useToast();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.warning("Passwords do not match");
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
                    <Button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent/90"
                    >
                        Reset Password
                    </Button>
                    <div className="text-center text-sm pt-2">
                        <Link className="text-accent hover:underline font-semibold" to="/login">Back to Login</Link>
                    </div>
                </form>
            </div>
        </>
    );
};
