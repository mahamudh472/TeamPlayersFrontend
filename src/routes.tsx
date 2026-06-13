import { createBrowserRouter, Navigate } from "react-router";
import {
    LandingLayout,
    HomeContainer,
    FeaturesContainer,
    PricingContainer,
    AboutContainer,
    ContactContainer,
    TermsContainer,
    PrivacyContainer,
    HowItWorksContainer,
} from "./features/landing";
import {
    AuthLayout,
    LoginContainer,
    RegisterContainer,
    ForgotPasswordContainer,
    OtpContainer,
    PasswordResetContainer,
    VerifyAccountContainer,
} from "./features/auth";
import {
    OnboardingLayout,
    OnboardingWelcomeContainer,
    OnboardingProfileContainer,
    OnboardingPreferencesContainer,
} from "./features/onboarding";
import {
    DashboardLayout,
    DashboardOverviewContainer,
} from "./features/dashboard";
import { AnalyticsContainer } from "./features/analytics";
import { SettingsContainer } from "./features/settings";
import { LeadGenerationContainer } from "./features/leads";
import {
    ClientsContainer,
    ClientDetailsContainer,
    ClientCreateContainer,
} from "./features/clients";
import {
    JobsContainer,
    JobDetailsContainer,
    JobCreateContainer,
} from "./features/jobs";
import {
    CandidatesContainer,
    CandidateDetailsContainer,
} from "./features/candidates";
import { InterviewsContainer } from "./features/interviews";
import { PlacementsContainer } from "./features/placements";
import { FaqContainer } from "./features/landing/containers/FaqContainer";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <LandingLayout />,
        children: [
            {
                index: true,
                element: <HomeContainer />,
            },
            {
                path: "features",
                element: <FeaturesContainer />,
            },
            {
                path: "pricing",
                element: <PricingContainer />,
            },
            {
                path: "about-us",
                element: <AboutContainer />,
            },
            {
                path: "faq",
                element: <FaqContainer />,
            },

            {
                path: "contact",
                element: <ContactContainer />,
            },
            {
                path: "how-it-works",
                element: <HowItWorksContainer />,
            },
            {
                path: "terms",
                element: <TermsContainer />,
            },
            {
                path: "privacy",
                element: <PrivacyContainer />,
            },
        ],
    },
    // Auth Routes
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <LoginContainer />,
            },
            {
                path: "register",
                element: <RegisterContainer />,
            },
            {
                path: "forgot-password",
                element: <ForgotPasswordContainer />,
            },
            {
                path: "otp",
                element: <OtpContainer />,
            },
            {
                path: "password-reset",
                element: <PasswordResetContainer />,
            },
            {
                path: "verify-account",
                element: <VerifyAccountContainer />,
            },
        ],
    },
    {
        path: "/onboarding",
        element: <OnboardingLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/onboarding/welcome" replace />,
            },
            {
                path: "welcome",
                element: <OnboardingWelcomeContainer />,
            },
            {
                path: "profile",
                element: <OnboardingProfileContainer />,
            },
            {
                path: "preferences",
                element: <OnboardingPreferencesContainer />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <DashboardOverviewContainer />,
            },
            {
                path: "leads",
                element: <LeadGenerationContainer />,
            },
            {
                path: "clients",
                children: [
                    {
                        index: true,
                        element: <ClientsContainer />,
                    },
                    {
                        path: "create",
                        element: <ClientCreateContainer />,
                    },
                    {
                        path: "edit/:id",
                        element: <ClientCreateContainer />,
                    },
                    {
                        path: ":id",
                        element: <ClientDetailsContainer />,
                    },
                ],
            },
            {
                path: "jobs",
                children: [
                    {
                        index: true,
                        element: <JobsContainer />,
                    },
                    {
                        path: "create",
                        element: <JobCreateContainer />,
                    },
                    {
                        path: "edit/:id",
                        element: <JobCreateContainer />,
                    },
                    {
                        path: ":id",
                        element: <JobDetailsContainer />,
                    },
                ],
            },
            {
                path: "candidates",
                children: [
                    {
                        index: true,
                        element: <CandidatesContainer />,
                    },
                    {
                        path: ":id",
                        element: <CandidateDetailsContainer />,
                    },
                ],
            },
            {
                path: "interviews",
                element: <InterviewsContainer />,
            },
            {
                path: "placements",
                element: <PlacementsContainer />,
            },
            {
                path: "analytics/:tab?",
                element: <AnalyticsContainer />,
            },
            {
                path: "settings/:tab?",
                element: <SettingsContainer />,
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);
