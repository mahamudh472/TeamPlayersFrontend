import React from "react";
import { PageHeader } from "../../../components/ui";
import { Building2 } from "lucide-react";
import { useNavigate } from "react-router";
import { ClientStats } from "../components/ClientStats";
import { ClientsList } from "../components/ClientsList";

export const ClientsContainer: React.FC = () => {
    const navigate = useNavigate();

    return (
        <main className="space-y-8">
            <PageHeader
                title="Clients"
                subtitle="Manage your client relationships"
                action={{
                    title: "Add Client",
                    icon: Building2,
                    onClick: () => {
                        navigate("/dashboard/clients/create");
                    },
                }}
            />

            {/* Clients stats card grid */}
            <ClientStats />

            {/* Clients listing list */}
            <ClientsList />
        </main>
    );
};
