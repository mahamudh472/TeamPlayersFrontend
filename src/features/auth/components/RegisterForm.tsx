import React, { useState } from "react";
import { Link } from "react-router";
import { Input } from "../../../components/ui";

interface RegisterFormProps {
    onSubmit: (data: {
        name: string;
        email: string;
        agencyName: string;
    }) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [agencyName, setAgencyName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (!agree) {
            alert("You must agree to the Terms and Privacy Policy");
            return;
        }
        onSubmit({ name, email, agencyName });
    };

    return (
        <>
            <div data-slot="card-header" className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 pt-2 text-center">
                <div className="flex justify-center mb-4">
                    <img src="/logo.png" alt="NoahMoore Logo" className="h-12 w-auto object-contain" />
                </div>
                <h4 data-slot="card-title" className="leading-none text-xl font-bold text-text-main">Create Your Account</h4>
                <p data-slot="card-description" className="text-muted-foreground text-sm">Start your 14-day free trial</p>
            </div>
            <div data-slot="card-content" className="[&:last-child]:pb-6 mt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Full Name"
                        type="text"
                        id="name"
                        placeholder="John Smith"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        id="email"
                        placeholder="you@agency.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Agency Name"
                        type="text"
                        id="agencyName"
                        placeholder="Your Agency Ltd"
                        required
                        value={agencyName}
                        onChange={(e) => setAgencyName(e.target.value)}
                    />
                    <Input
                        label="Password"
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        placeholder="••••••••"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="flex items-start gap-2">
                        <button
                            type="button"
                            role="checkbox"
                            aria-checked={agree}
                            data-state={agree ? "checked" : "unchecked"}
                            onClick={() => setAgree(!agree)}
                            className="peer bg-input-background dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 size-4 shrink-0 rounded-[4px] border border-btn-sec-border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 mt-0.5 cursor-pointer flex items-center justify-center"
                            id="terms"
                        >
                            {agree && (
                                <span className="flex items-center justify-center text-current">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check size-3.5">
                                        <path d="M20 6 9 17l-5-5"></path>
                                    </svg>
                                </span>
                            )}
                        </button>
                        <label className="text-sm font-medium text-text-main select-none cursor-pointer leading-relaxed" htmlFor="terms">
                            I agree to the{" "}
                            <Link to="/terms" className="text-accent hover:underline font-semibold">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link to="/privacy" className="text-accent hover:underline font-semibold">
                                Privacy Policy
                            </Link>
                        </label>
                    </div>
                    <button
                        data-slot="button"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-white h-9 px-4 py-2 w-full bg-accent hover:bg-accent/90 cursor-pointer"
                        type="submit"
                    >
                        Create Account
                    </button>
                    <div className="text-center text-sm pt-2">
                        <span className="text-muted-foreground">Already have an account? </span>
                        <Link className="text-accent hover:underline font-semibold" to="/login">Sign in</Link>
                    </div>
                </form>
            </div>
        </>
    );
};
