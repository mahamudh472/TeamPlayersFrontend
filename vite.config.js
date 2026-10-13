import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const microsoftIdentityAssociationPlugin = () => {
    const jsonPayload = JSON.stringify(
        {
            associatedApplications: [
                {
                    applicationId: "740f7b80-8380-478b-80b9-f704ca38a4bd",
                },
            ],
        },
        null,
        2
    );

    const handler = (req, res, next) => {
        const url = req.url?.split("?")[0];
        if (
            url === "/.well-known/microsoft-identity-association" ||
            url === "/.well-known/microsoft-identity-association.json"
        ) {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(jsonPayload);
            return;
        }
        next();
    };

    return {
        name: "microsoft-identity-association",
        configureServer(server) {
            server.middlewares.use(handler);
        },
        configurePreviewServer(server) {
            server.middlewares.use(handler);
        },
    };
};

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), microsoftIdentityAssociationPlugin()],

    server: {
        allowedHosts: ["simple-stingray-daring.ngrok-free.app"],
    },
});

