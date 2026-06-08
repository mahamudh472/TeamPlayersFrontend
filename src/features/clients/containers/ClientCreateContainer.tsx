import React from "react";
import { useParams } from "react-router";
import { Typography, BackButton } from "../../../components/ui";

export const ClientCreateContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const isEdit = !!id;

    return (
        <main className="space-y-6">
            <div className="flex items-center gap-4">
                <BackButton
                    label={`Back to ${isEdit ? "Client Details" : "Clients"}`}
                />
            </div>
            <div>
                <Typography variant="h2">
                    {isEdit ? "Edit Client Profile" : "Add New Client"}
                </Typography>
                <Typography variant="body1" className="text-muted-text mt-1">
                    {isEdit
                        ? `Modify details for client ID: ${id} below.`
                        : "Fill out the form below to register a new client profile."}
                </Typography>
            </div>
        </main>
    );
};
