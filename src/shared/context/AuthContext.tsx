import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient, setTokens, clearTokens, getAccessToken } from "../api/apiClient";

export interface UserProfile {
    id: string;
    full_name: string;
    email: string;
    is_active: boolean;
    agency_name: string;
    agency_id: number | string;
    role: string;
    avatar: string | null;
}

interface AuthContextType {
    user: UserProfile | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string, fullName: string, agencyName: string) => Promise<{ message: string }>;
    verifyEmail: (email: string, otp: string) => Promise<{ message: string }>;
    sendPasswordReset: (email: string) => Promise<{ message: string }>;
    checkOtp: (email: string, otp: string) => Promise<{ message: string }>;
    confirmPasswordReset: (email: string, otp: string, newPassword: string) => Promise<{ message: string }>;
    changePassword: (oldPassword: string, newPassword: string, confirmPassword: string) => Promise<{ message: string }>;
    updateProfile: (fullName: string, avatarFile: File | null) => Promise<UserProfile>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadProfile = async () => {
        try {
            const response = await apiClient.get<UserProfile>("/api/v1/accounts/profile/");
            setUser(response.data);
        } catch (error) {
            setUser(null);
            clearTokens();
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const token = getAccessToken();
            if (token) {
                await loadProfile();
            }
            setIsLoading(false);
        };

        initializeAuth();

        const handleLogoutEvent = () => {
            setUser(null);
            clearTokens();
        };

        window.addEventListener("auth-logout", handleLogoutEvent);
        return () => {
            window.removeEventListener("auth-logout", handleLogoutEvent);
        };
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await apiClient.post("/api/v1/accounts/login/", { email, password });
            const { access, refresh } = response.data;
            setTokens(access, refresh);
            await loadProfile();
        } catch (error: any) {
            // Check for non-active account / email not verified
            if (error.response?.data?.code === "EMAIL_NOT_VERIFIED") {
                localStorage.setItem("pending_verification_email", email);
            }
            throw error;
        }
    };

    const logout = async () => {
        try {
            // Request to blacklist token/logout
            await apiClient.post("/api/v1/accounts/logout/");
        } catch (error) {
            console.error("Logout API call failed, forcing local logout", error);
        } finally {
            clearTokens();
            setUser(null);
        }
    };

    const register = async (email: string, password: string, fullName: string, agencyName: string) => {
        const response = await apiClient.post("/api/v1/accounts/register/", {
            email,
            password,
            full_name: fullName,
            agency_name: agencyName,
        });
        localStorage.setItem("pending_verification_email", email);
        return response.data;
    };

    const verifyEmail = async (email: string, otp: string) => {
        const response = await apiClient.post("/api/v1/accounts/verify-email/", { email, otp });
        // After successful verification, clean up pending verification email
        localStorage.removeItem("pending_verification_email");
        return response.data;
    };

    const sendPasswordReset = async (email: string) => {
        const response = await apiClient.post("/api/v1/accounts/password-reset/", { email });
        localStorage.setItem("reset_password_email", email);
        return response.data;
    };

    const checkOtp = async (email: string, otp: string) => {
        const response = await apiClient.post("/api/v1/accounts/check-otp/", { email, otp });
        return response.data;
    };

    const confirmPasswordReset = async (email: string, otp: string, newPassword: string) => {
        const response = await apiClient.post("/api/v1/accounts/password-reset-confirm/", {
            email,
            otp,
            new_password: newPassword,
        });
        localStorage.removeItem("reset_password_email");
        return response.data;
    };

    const changePassword = async (oldPassword: string, newPassword: string, confirmPassword: string) => {
        const response = await apiClient.post("/api/v1/accounts/change-password/", {
            old_password: oldPassword,
            new_password: newPassword,
            confirm_password: confirmPassword,
        });
        return response.data;
    };

    const updateProfile = async (fullName: string, avatarFile: File | null) => {
        const formData = new FormData();
        formData.append("full_name", fullName);
        if (avatarFile) {
            formData.append("avatar", avatarFile);
        }

        const response = await apiClient.patch<UserProfile>("/api/v1/accounts/profile/update/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        setUser(response.data);
        return response.data;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
                register,
                verifyEmail,
                sendPasswordReset,
                checkOtp,
                confirmPasswordReset,
                changePassword,
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
