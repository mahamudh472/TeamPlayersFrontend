import React, { useState } from "react";
import { Link } from "react-router";
import { Typography } from "../../../components/ui";
import { Search, Building2, Mail } from "lucide-react";

interface ClientItem {
    id: string;
    name: string;
    status: "active" | "inactive";
    industry: string;
    contactName: string;
    contactEmail: string;
    jobsCount: number;
    placementsCount: number;
    revenue: string;
}

export const ClientsList: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const clients: ClientItem[] = [
        {
            id: "1",
            name: "GlobalTech Industries",
            status: "active",
            industry: "Technology",
            contactName: "David Smith",
            contactEmail: "david.smith@globaltech.com",
            jobsCount: 12,
            placementsCount: 8,
            revenue: "£125k",
        },
        {
            id: "2",
            name: "RetailPro Group",
            status: "active",
            industry: "Retail",
            contactName: "Lisa Anderson",
            contactEmail: "l.anderson@retailpro.co.uk",
            jobsCount: 8,
            placementsCount: 5,
            revenue: "£75k",
        },
        {
            id: "3",
            name: "Manufacturing United",
            status: "active",
            industry: "Manufacturing",
            contactName: "John Williams",
            contactEmail: "j.williams@manufunited.com",
            jobsCount: 15,
            placementsCount: 11,
            revenue: "£165k",
        },
    ];

    const filteredClients = clients.filter(
        (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.contactName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-white text-text-main flex flex-col gap-6 rounded-xl border border-btn-sec-border">
            <div className="px-6 pt-6 pb-2">
                <div className="flex items-center justify-between">
                    <Typography variant="h4" className="font-bold text-text-main leading-none">
                        All Clients
                    </Typography>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex h-9 w-full rounded-md border border-btn-sec-border px-3 py-1 text-sm bg-white outline-none pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20"
                            placeholder="Search clients..."
                        />
                    </div>
                </div>
            </div>

            <div className="px-6 pb-6">
                <div className="space-y-3">
                    {filteredClients.map((client) => (
                        <Link
                            key={client.id}
                            to={`/dashboard/clients/${client.id}`}
                            className="flex items-center gap-4 p-4 border border-btn-sec-border rounded-xl hover:bg-slate-50/50 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Building2 className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <Typography variant="body1" className="font-semibold text-text-main">
                                        {client.name}
                                    </Typography>
                                    <span className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold w-fit capitalize">
                                        {client.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-text">
                                    <span>{client.industry}</span>
                                    <span>{client.contactName}</span>
                                    <span className="flex items-center gap-1">
                                        <Mail className="w-3.5 h-3.5" />
                                        {client.contactEmail}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 text-sm text-right">
                                <div>
                                    <p className="text-2xl font-bold text-text-main">{client.jobsCount}</p>
                                    <p className="text-xs text-muted-text">Jobs</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-text-main">{client.placementsCount}</p>
                                    <p className="text-xs text-muted-text">Placements</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-green-500">{client.revenue}</p>
                                    <p className="text-xs text-muted-text">Revenue</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {filteredClients.length === 0 && (
                        <div className="p-8 text-center text-muted-text">
                            No clients found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
