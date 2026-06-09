import React from "react";
import { Link } from "react-router";
import { Typography, BackButton } from "../../../components/ui";
import { Building2, Mail, Phone } from "lucide-react";

interface ClientDetailsHeaderProps {
    id: string;
    name: string;
    status: string;
    email: string;
    phone: string;
}

export const ClientDetailsHeader: React.FC<ClientDetailsHeaderProps> = ({
    id,
    name,
    status,
    email,
    phone,
}) => {
    return (
        <div className="flex flex-col gap-4">
            <BackButton label="Back to Clients" to="/dashboard/clients" />

            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                            <Typography variant="h2" className="text-2xl font-bold text-text-main leading-tight">
                                {name}
                            </Typography>
                            <span className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold w-fit capitalize">
                                {status}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-text">
                            <span className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                {email}
                            </span>
                            <span className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                {phone}
                            </span>
                        </div>
                    </div>
                </div>
                <Link
                    to={`/dashboard/clients/edit/${id}`}
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all outline-none border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 h-10 rounded-lg px-4"
                >
                    Edit Client
                </Link>
            </div>
        </div>
    );
};
