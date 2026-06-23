import React from "react";
import { Link } from "react-router";
import { Typography, BackButton, Button } from "../../../components/ui";
import { Briefcase, MapPin, DollarSign, UploadCloud } from "lucide-react";

import { JobDetailsHeaderProps } from "../types";

export const JobDetailsHeader: React.FC<JobDetailsHeaderProps> = ({
    id,
    title,
    status,
    company,
    location,
    salary,
    onUploadCV,
}) => {
    return (
        <div className="flex flex-col gap-4">
            <BackButton label="Back to Jobs" to="/dashboard/jobs" />

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
                <div className="flex items-center gap-2">
                    <Button
                        variant="primary"
                        prefixIcon={UploadCloud}
                        onClick={onUploadCV}
                    >
                        Upload CV
                    </Button>
                    <Link to={`/dashboard/jobs/edit/${id || "1"}`}>
                        <Button variant="secondary">
                            Edit Job
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
