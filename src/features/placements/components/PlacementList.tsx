import React, { useState } from "react";
import { Link } from "react-router";
import { Typography, Tabs, TabOption, AppBadge, Button } from "../../../components/ui";
import { Users, Briefcase, Calendar } from "lucide-react";

interface PlacementItem {
    id: string;
    candidateId: string;
    candidateName: string;
    candidateEmail: string;
    position: string;
    client: string;
    salary: string;
    fee: string;
    placedDate: string;
    status: "Started" | "Guarantee Period" | "Offer Accepted" | "Offer Sent";
}

const placementsData: PlacementItem[] = [
    {
        id: "1",
        candidateId: "1",
        candidateName: "Alex Thompson",
        candidateEmail: "alex.thompson@email.com",
        position: "Senior Software Engineer",
        client: "GlobalTech Industries",
        salary: "£85,000",
        fee: "£17,000",
        placedDate: "15/04/2026",
        status: "Started",
    },
    {
        id: "2",
        candidateId: "2",
        candidateName: "Sarah Martinez",
        candidateEmail: "sarah.martinez@email.com",
        position: "Product Manager",
        client: "GlobalTech Industries",
        salary: "£65,000",
        fee: "£13,000",
        placedDate: "20/03/2026",
        status: "Guarantee Period",
    },
    {
        id: "3",
        candidateId: "3",
        candidateName: "James Wilson",
        candidateEmail: "james.wilson@email.com",
        position: "Store Manager",
        client: "RetailPro Group",
        salary: "£42,000",
        fee: "£8,400",
        placedDate: "01/05/2026",
        status: "Offer Accepted",
    },
    {
        id: "4",
        candidateId: "4",
        candidateName: "Emma Davis",
        candidateEmail: "emma.davis@email.com",
        position: "Operations Manager",
        client: "Manufacturing United",
        salary: "£58,000",
        fee: "£11,600",
        placedDate: "10/05/2026",
        status: "Offer Sent",
    },
    {
        id: "5",
        candidateId: "1",
        candidateName: "Alex Thompson",
        candidateEmail: "alex.thompson@email.com",
        position: "Senior Software Engineer",
        client: "GlobalTech Industries",
        salary: "£75,000",
        fee: "£15,000",
        placedDate: "10/02/2026",
        status: "Started",
    },
    {
        id: "6",
        candidateId: "2",
        candidateName: "Sarah Martinez",
        candidateEmail: "sarah.martinez@email.com",
        position: "Product Manager",
        client: "GlobalTech Industries",
        salary: "£68,000",
        fee: "£13,600",
        placedDate: "15/01/2026",
        status: "Guarantee Period",
    },
    {
        id: "7",
        candidateId: "3",
        candidateName: "James Wilson",
        candidateEmail: "james.wilson@email.com",
        position: "Store Manager",
        client: "RetailPro Group",
        salary: "£38,000",
        fee: "£7,600",
        placedDate: "20/04/2026",
        status: "Started",
    },
    {
        id: "8",
        candidateId: "4",
        candidateName: "Emma Davis",
        candidateEmail: "emma.davis@email.com",
        position: "Operations Manager",
        client: "Manufacturing United",
        salary: "£52,000",
        fee: "£10,400",
        placedDate: "25/05/2026",
        status: "Offer Accepted",
    },
];

export const PlacementList: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("all");

    const getStatusCount = (tab: string) => {
        if (tab === "all") return placementsData.length;
        if (tab === "offers") {
            return placementsData.filter(
                (p) => p.status === "Offer Sent" || p.status === "Offer Accepted"
            ).length;
        }
        if (tab === "active") {
            return placementsData.filter(
                (p) => p.status === "Started" || p.status === "Guarantee Period"
            ).length;
        }
        return 0;
    };

    const tabOptions: TabOption[] = [
        { label: `All Placements (${getStatusCount("all")})`, value: "all" },
        { label: `Offers (${getStatusCount("offers")})`, value: "offers" },
        { label: `Active (${getStatusCount("active")})`, value: "active" },
    ];

    const filteredPlacements = placementsData.filter((p) => {
        if (activeTab === "all") return true;
        if (activeTab === "offers") {
            return p.status === "Offer Sent" || p.status === "Offer Accepted";
        }
        if (activeTab === "active") {
            return p.status === "Started" || p.status === "Guarantee Period";
        }
        return true;
    });

    const getBadgeVariant = (status: string): "primary" | "secondary" | "outline" | "neutral" => {
        switch (status) {
            case "Started":
            case "Offer Accepted":
                return "primary";
            case "Guarantee Period":
            case "Offer Sent":
            default:
                return "secondary";
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <Tabs
                options={tabOptions}
                value={activeTab}
                onChange={setActiveTab}
            />

            <div className="bg-white rounded-xl border border-btn-sec-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-btn-sec-border bg-slate-50/50">
                                <th className="p-4 font-semibold text-text-main">Candidate</th>
                                <th className="p-4 font-semibold text-text-main">Position</th>
                                <th className="p-4 font-semibold text-text-main">Client</th>
                                <th className="p-4 font-semibold text-text-main">Salary</th>
                                <th className="p-4 font-semibold text-text-main">Fee</th>
                                <th className="p-4 font-semibold text-text-main">Placed Date</th>
                                <th className="p-4 font-semibold text-text-main">Status</th>
                                <th className="p-4 font-semibold text-text-main"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-btn-sec-border">
                            {filteredPlacements.map((p, index) => (
                                <tr key={p.id + "-" + index} className="hover:bg-slate-50/30 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-primary shrink-0">
                                                <Users className="w-4 h-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <Typography variant="body2" className="font-semibold text-text-main leading-snug">
                                                    {p.candidateName}
                                                </Typography>
                                                <Typography variant="caption" className="text-xs text-muted-text block">
                                                    {p.candidateEmail}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-text-main font-medium">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-muted-text shrink-0" />
                                            <span className="truncate">{p.position}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-text-main">{p.client}</td>
                                    <td className="p-4 text-text-main font-medium">{p.salary}</td>
                                    <td className="p-4 font-bold text-primary">{p.fee}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-muted-text">
                                            <Calendar className="w-4 h-4" />
                                            <span>{p.placedDate}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <AppBadge variant={getBadgeVariant(p.status)}>
                                            {p.status}
                                        </AppBadge>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Link to={`/dashboard/candidates/${p.candidateId}`}>
                                            <Button variant="outline" size="sm">
                                                View
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {filteredPlacements.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="p-8 text-center text-muted-text">
                                        No placements found in this category.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
