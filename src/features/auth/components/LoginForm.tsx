import React, { useState } from "react";
import { Link } from "react-router";
import { Input } from "../../../components/ui";

interface LoginFormProps {
    onSubmit: (email: string, password: string, remember: boolean) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(email, password, remember);
    };

    return (
        <>
            <div data-slot="card-header" className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 pt-2 text-center">
                <div className="flex justify-center mb-4">
                    <img src="/logo.png" alt="NoahMoore Logo" className="h-12 w-auto object-contain" />
                </div>
                <h4 data-slot="card-title" className="leading-none text-xl font-bold text-text-main">Welcome Back</h4>
                <p data-slot="card-description" className="text-muted-foreground text-sm">Sign in to your account to continue</p>
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
                    
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="cursor-pointer select-none" htmlFor="password">
                                <span className="text-sm font-semibold text-text-main">Password</span>
                            </label>
                            <Link className="text-sm text-accent hover:underline font-semibold" to="/forgot-password">Forgot password?</Link>
                        </div>
                        <input
                            type="password"
                            className="w-full py-2.5 rounded-lg border text-sm font-medium text-text-main transition-all duration-200 outline-none bg-white placeholder:text-light-text focus:ring-2 focus:ring-primary/20 px-3.5 border-btn-sec-border focus:border-primary focus:ring-primary/20"
                            id="password"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            role="checkbox"
                            aria-checked={remember}
                            data-state={remember ? "checked" : "unchecked"}
                            onClick={() => setRemember(!remember)}
                            className="peer bg-input-background dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 size-4 shrink-0 rounded-[4px] border border-btn-sec-border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer flex items-center justify-center"
                            id="remember"
                        >
                            {remember && (
                                <span className="flex items-center justify-center text-current">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check size-3.5">
                                        <path d="M20 6 9 17l-5-5"></path>
                                    </svg>
                                </span>
                            )}
                        </button>
                        <label className="text-sm font-medium text-text-main select-none cursor-pointer" htmlFor="remember">Remember me</label>
                    </div>
                    <button
                        data-slot="button"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-white h-9 px-4 py-2 w-full bg-accent hover:bg-accent/90 cursor-pointer"
                        type="submit"
                    >
                        Sign In
                    </button>
                    <div className="text-center text-sm pt-2">
                        <span className="text-muted-foreground">Don't have an account? </span>
                        <Link className="text-accent hover:underline font-semibold" to="/register">Sign up</Link>
                    </div>
                </form>
            </div>
        </>
    );
};
