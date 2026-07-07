import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routes } from "./routes";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./shared/context/AuthContext";
import { ToastProvider } from "./shared/context/ToastContext";
import { NotificationsProvider } from "./shared/context/NotificationsContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <ToastProvider>
                <NotificationsProvider>
                    <RouterProvider router={routes}></RouterProvider>
                </NotificationsProvider>
            </ToastProvider>
        </AuthProvider>
    </StrictMode>,
);
