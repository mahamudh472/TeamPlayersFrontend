import React, { useState, useEffect } from "react";
import {
    Typography,
    Input,
    AppBadge,
    Button,
    Select,
    OptionType,
} from "../../../components/ui";
import { User, Users } from "lucide-react";
import { apiClient } from "../../../shared/api/apiClient";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";

interface TeamMember {
    id: number;
    user_id: string | null;
    email: string;
    full_name: string | null;
    role: "owner" | "admin" | "recruiter";
    invitation_status: "accepted" | "pending";
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export const TeamSettings: React.FC = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const agencyId = localStorage.getItem("selected_agency_id") || user?.agency_id;

    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState<OptionType | null>({ label: "Recruiter", value: "recruiter" });

    const [manageEmail, setManageEmail] = useState("");
    const [manageRole, setManageRole] = useState<OptionType | null>(null);

    const [isInviting, setIsInviting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchMembers = async () => {
        if (!agencyId) {
            setIsLoading(false);
            return;
        }
        try {
            setIsLoading(true);
            const response = await apiClient.get<TeamMember[]>("/api/v1/agency/members/", {
                headers: {
                    "X-Agency-ID": String(agencyId),
                },
            });
            setTeamMembers(response.data);
        } catch (error: any) {
            console.error("Failed to load team members:", error);
            toast.error(error.response?.data?.detail || "Failed to load team members.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [agencyId]);

    const canInvite = user?.role === "owner" || user?.role === "admin";

    const canManageMember = (member: TeamMember) => {
        if (!user) return false;
        
        // Cannot manage oneself
        if (member.email === user.email) return false;
        
        // Owner can manage everyone else
        if (user.role === "owner") return true;
        
        // Admin can manage admins and recruiters (anyone except owner and oneself)
        if (user.role === "admin" && member.role !== "owner") return true;
        
        return false;
    };

    const openManageModal = (member: TeamMember) => {
        setSelectedMember(member);
        setManageEmail(member.email);
        setManageRole({
            label: member.role.charAt(0).toUpperCase() + member.role.slice(1),
            value: member.role,
        });
        setIsManageModalOpen(true);
    };

    const handleInviteSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteEmail || !inviteRole || !agencyId) return;
        
        try {
            setIsInviting(true);
            const response = await apiClient.post<TeamMember>(
                "/api/v1/agency/members/",
                {
                    email: inviteEmail,
                    role: inviteRole.value,
                },
                {
                    headers: {
                        "X-Agency-ID": String(agencyId),
                    },
                }
            );
            toast.success(`Invitation sent successfully to ${inviteEmail}.`);
            setTeamMembers((prev) => [...prev, response.data]);
            setIsInviteModalOpen(false);
            setInviteEmail("");
        } catch (error: any) {
            console.error("Failed to send invitation:", error);
            const data = error.response?.data;
            let errMsg = "Failed to send invitation.";
            if (data) {
                if (data.email) {
                    errMsg = `Email: ${data.email.join(" ")}`;
                } else if (data.role) {
                    errMsg = `Role: ${data.role.join(" ")}`;
                } else {
                    errMsg = data.detail || data.error || errMsg;
                }
            }
            toast.error(errMsg);
        } finally {
            setIsInviting(false);
        }
    };

    const handleManageSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMember || !manageRole || !agencyId) return;
        
        try {
            setIsSaving(true);
            const response = await apiClient.patch<TeamMember>(
                `/api/v1/agency/members/${selectedMember.id}/`,
                {
                    role: manageRole.value,
                },
                {
                    headers: {
                        "X-Agency-ID": String(agencyId),
                    },
                }
            );
            toast.success("Team member role updated successfully!");
            setTeamMembers((prev) =>
                prev.map((m) => (m.id === selectedMember.id ? response.data : m))
            );
            setIsManageModalOpen(false);
        } catch (error: any) {
            console.error("Failed to update role:", error);
            toast.error(error.response?.data?.detail || "Failed to update role.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleRemoveMember = async () => {
        if (!selectedMember || !agencyId) return;
        
        const confirmName = selectedMember.full_name || selectedMember.email;
        if (!window.confirm(`Are you sure you want to remove ${confirmName} from this agency?`)) {
            return;
        }

        try {
            setIsDeleting(true);
            await apiClient.delete(`/api/v1/agency/members/${selectedMember.id}/`, {
                headers: {
                    "X-Agency-ID": String(agencyId),
                },
            });
            toast.success("Team member removed successfully.");
            setTeamMembers((prev) => prev.filter((m) => m.id !== selectedMember.id));
            setIsManageModalOpen(false);
        } catch (error: any) {
            console.error("Failed to remove member:", error);
            toast.error(error.response?.data?.detail || "Failed to remove member.");
        } finally {
            setIsDeleting(false);
        }
    };

    const getDisplayName = (member: TeamMember) => {
        if (member.full_name) return member.full_name;
        // fallback to username/email part capitalized
        const prefix = member.email.split("@")[0];
        return prefix
            .split(/[._-]/)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
    };

    const manageRoleOptions = user?.role === "owner"
        ? [
              { label: "Owner", value: "owner" },
              { label: "Admin", value: "admin" },
              { label: "Recruiter", value: "recruiter" },
          ]
        : [
              { label: "Admin", value: "admin" },
              { label: "Recruiter", value: "recruiter" },
          ];

    const inviteRoleOptions = [
        { label: "Admin", value: "admin" },
        { label: "Recruiter", value: "recruiter" },
    ];

    if (!agencyId) {
        return (
            <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs flex flex-col items-center justify-center p-12 min-h-[300px]">
                <Typography variant="h4" className="font-bold text-text-main">
                    No Active Agency Selected
                </Typography>
                <Typography variant="body2" className="text-muted-text mt-2 text-center max-w-sm">
                    Please select or join an agency to manage its team members.
                </Typography>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl border border-btn-sec-border shadow-xs flex flex-col items-center justify-center p-12 min-h-[350px]">
                <svg
                    className="animate-spin text-primary shrink-0 w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
                <Typography variant="body2" className="text-muted-text mt-4">
                    Loading team members...
                </Typography>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs space-y-6 text-left">
            <div className="flex items-center justify-between">
                <div>
                    <Typography variant="h4" className="font-bold text-text-main">
                        Team Members
                    </Typography>
                    <Typography variant="body2" className="text-muted-text">
                        Manage your team and permissions
                    </Typography>
                </div>
                {canInvite && (
                    <Button
                        variant="primary"
                        className="flex items-center gap-2 cursor-pointer animate-fade-in"
                        onClick={() => setIsInviteModalOpen(true)}
                    >
                        <Users className="w-4 h-4" /> Invite Member
                    </Button>
                )}
            </div>

            <div className="space-y-3">
                {teamMembers.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-btn-sec-border rounded-lg bg-slate-50/50">
                        <Typography variant="body2" className="text-muted-text">
                            No team members found.
                        </Typography>
                    </div>
                ) : (
                    teamMembers.map((member) => (
                        <div key={member.id} className="flex items-center gap-4 p-4 border border-btn-sec-border rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <User className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <Typography variant="body1" className="font-semibold text-text-main text-sm">
                                        {getDisplayName(member)}
                                    </Typography>
                                    {member.email === user?.email && (
                                        <AppBadge variant="secondary" className="text-[10px] leading-none py-0.5 px-1.5 bg-slate-100 text-slate-600">
                                            You
                                        </AppBadge>
                                    )}
                                </div>
                                <Typography variant="body2" className="text-xs text-muted-text">
                                    {member.email}
                                </Typography>
                            </div>
                            <div className="flex items-center gap-2">
                                <AppBadge variant={
                                    member.role === "owner" ? "primary" :
                                    member.role === "admin" ? "outline" : "secondary"
                                } className="capitalize">
                                    {member.role}
                                </AppBadge>
                                {member.invitation_status === "pending" && (
                                    <AppBadge variant="neutral">
                                        Pending
                                    </AppBadge>
                                )}
                                {canManageMember(member) && (
                                    <Button
                                        variant="outline"
                                        className="text-xs py-1 px-2.5 h-8 cursor-pointer"
                                        onClick={() => openManageModal(member)}
                                    >
                                        Manage
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Invite Modal */}
            {isInviteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in-0 duration-200">
                    <div className="absolute inset-0 cursor-pointer" onClick={() => setIsInviteModalOpen(false)} />
                    <form onSubmit={handleInviteSubmit} className="bg-white rounded-xl border border-btn-sec-border shadow-xl w-full max-w-md p-6 relative flex flex-col gap-4 animate-in zoom-in-95 duration-200 z-10 text-left">
                        <div>
                            <Typography variant="h4" className="font-bold text-text-main">
                                Invite Member
                            </Typography>
                            <Typography variant="body2" className="text-muted-text">
                                Send an invitation to join your team.
                            </Typography>
                        </div>
                        <div className="space-y-4">
                            <Input
                                label="Email Address"
                                placeholder="Enter email"
                                type="email"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                required
                            />
                            <Select
                                label="Role"
                                options={inviteRoleOptions}
                                value={inviteRole}
                                onChange={(val) => setInviteRole(val as OptionType)}
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                            <Button type="button" variant="secondary" onClick={() => setIsInviteModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" loading={isInviting}>
                                Send Invitation
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Manage Modal */}
            {isManageModalOpen && selectedMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in-0 duration-200">
                    <div className="absolute inset-0 cursor-pointer" onClick={() => setIsManageModalOpen(false)} />
                    <form onSubmit={handleManageSubmit} className="bg-white rounded-xl border border-btn-sec-border shadow-xl w-full max-w-md p-6 relative flex flex-col gap-4 animate-in zoom-in-95 duration-200 z-10 text-left">
                        <div>
                            <Typography variant="h4" className="font-bold text-text-main">
                                Manage Member
                            </Typography>
                            <Typography variant="body2" className="text-muted-text">
                                Update role or remove access for this member.
                            </Typography>
                        </div>
                        <div className="space-y-4">
                            <Input
                                label="Email Address"
                                type="email"
                                disabled
                                value={manageEmail}
                                required
                            />
                            <Select
                                label="Role"
                                options={manageRoleOptions}
                                value={manageRole}
                                onChange={(val) => setManageRole(val as OptionType)}
                                required
                            />
                        </div>
                        <div className="flex justify-between gap-3 border-t border-slate-100 pt-4 mt-2">
                            <Button
                                type="button"
                                variant="secondary"
                                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                                onClick={handleRemoveMember}
                                loading={isDeleting}
                            >
                                Remove Member
                            </Button>
                            <div className="flex gap-2">
                                <Button type="button" variant="secondary" onClick={() => setIsManageModalOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" loading={isSaving}>
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
