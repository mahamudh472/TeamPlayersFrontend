import React from "react";
import { Typography, BackButton } from "../../../components/ui";
import { Briefcase, MapPin, DollarSign } from "lucide-react";

interface JobDetailsHeaderProps {
    title: string;
    status: string;
    company: string;
    location: string;
    salary: string;
}

export const JobDetailsHeader: React.FC<JobDetailsHeaderProps> = ({
    title,
    status,
    company,
    location,
    salary,
}) => {
    return (
        <div className="flex flex-col gap-4">
            <BackButton label="Back to Jobs" />

            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                            <Typography variant="h2" className="text-2xl font-bold text-text-main leading-tight">
                                {title}
                            </Typography>
                            <span className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold w-fit capitalize">
                                {status}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-text">
                            <span className="font-medium text-text-main">{company}</span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {location}
                            </span>
                            <span className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                {salary}
                            </span>
                        </div>
                    </div>
                </div>
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all outline-none border border-btn-sec-border bg-white text-text-main hover:bg-slate-50 h-10 rounded-lg px-4">
                    Edit Job
                </button>
            </div>
        </div>
    );
};
