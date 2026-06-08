import React from "react";
import { Typography, BackButton } from "../../../components/ui";
import { Users, Mail, Phone, MapPin, X, Calendar } from "lucide-react";

interface CandidateDetailsHeaderProps {
    name: string;
    matchScore: number;
    status: string;
    email: string;
    phone: string;
    location: string;
}

export const CandidateDetailsHeader: React.FC<CandidateDetailsHeaderProps> = ({
    name,
    matchScore,
    status,
    email,
    phone,
    location,
}) => {
    return (
        <div className="flex flex-col gap-4">
            <BackButton label="Back to Candidates" />

            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Users className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <Typography variant="h2" className="text-2xl font-bold text-text-main leading-tight">
                                {name}
                            </Typography>
                            <span className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold w-fit capitalize">
                                {matchScore}% match
                            </span>
                            <span className="inline-flex items-center justify-center rounded-md border border-btn-sec-border px-2 py-0.5 text-xs font-medium text-text-main bg-slate-50 capitalize">
                                {status}
                            </span>
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-text flex-wrap">
                            <span className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                {email}
                            </span>
                            <span className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                {phone}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {location}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-2">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all outline-none border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 h-9 px-4 py-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Interview
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all outline-none border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 h-9 px-4 py-2">
                        <X className="w-4 h-4 mr-2" />
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};
