import React, { useState } from "react";
import {
    Typography,
    Input,
    AppBadge,
    Button,
    Select,
    OptionType,
} from "../../../components/ui";
import { User, Users } from "lucide-react";

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: string;
}

export const TeamSettings: React.FC = () => {
    // Team member & modal states
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
        { id: "1", name: "Demo User", email: "driver2@luxuryops.com", role: "Admin" },
        { id: "2", name: "Sarah Johnson", email: "sarah.johnson@agency.com", role: "Recruiter" },
    ]);

    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState<OptionType | null>({ label: "Recruiter", value: "Recruiter" });

    const [manageEmail, setManageEmail] = useState("");
    const [manageRole, setManageRole] = useState<OptionType | null>(null);

    const openManageModal = (member: TeamMember) => {
        setSelectedMember(member);
        setManageEmail(member.email);
        setManageRole({ label: member.role, value: member.role });
        setIsManageModalOpen(true);
    };

    const handleInviteSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteEmail || !inviteRole) return;
        const nameFromEmail = inviteEmail.split("@")[0].replace(/[._]/g, " ");
        setTeamMembers([
            ...teamMembers,
            {
                id: Math.random().toString(),
                name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
                email: inviteEmail,
                role: inviteRole.value,
            }
        ]);
        setIsInviteModalOpen(false);
        setInviteEmail("");
    };

    const handleManageSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMember || !manageEmail || !manageRole) return;
        const nameFromEmail = manageEmail.split("@")[0].replace(/[._]/g, " ");
        setTeamMembers(teamMembers.map(m => m.id === selectedMember.id ? {
            ...m,
            name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
            email: manageEmail,
            role: manageRole.value,
        } : m));
        setIsManageModalOpen(false);
    };

    const handleRemoveMember = () => {
        if (!selectedMember) return;
        setTeamMembers(teamMembers.filter(m => m.id !== selectedMember.id));
        setIsManageModalOpen(false);
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-btn-sec-border shadow-xs space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Typography variant="h4" className="font-bold text-text-main">
                        Team Members
                    </Typography>
                    <Typography variant="body2" className="text-muted-text">
                        Manage your team and permissions
                    </Typography>
                </div>
                <Button
                    variant="primary"
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setIsInviteModalOpen(true)}
                >
                    <Users className="w-4 h-4" /> Invite Member
                </Button>
            </div>
            <div className="space-y-3">
                {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-4 p-4 border border-btn-sec-border rounded-lg bg-slate-50/50">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <User className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <Typography variant="body1" className="font-semibold text-text-main text-sm">
                                {member.name}
                            </Typography>
                            <Typography variant="body2" className="text-xs text-muted-text">
                                {member.email}
                            </Typography>
                        </div>
                        <div className="flex items-center gap-2">
                            <AppBadge variant={member.role === "Admin" ? "primary" : "secondary"}>
                                {member.role}
                            </AppBadge>
                            {member.role !== "Admin" && (
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
                ))}
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
                                options={[
                                    { label: "Admin", value: "Admin" },
                                    { label: "Recruiter", value: "Recruiter" }
                                ]}
                                value={inviteRole}
                                onChange={(val) => setInviteRole(val as OptionType)}
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                            <Button type="button" variant="secondary" onClick={() => setIsInviteModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary">
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
                                // onChange={(e) => setManageEmail(e.target.value)}
                                required
                            />
                            <Select
                                label="Role"
                                options={[
                                    { label: "Admin", value: "Admin" },
                                    { label: "Recruiter", value: "Recruiter" }
                                ]}
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
                            >
                                Remove Member
                            </Button>
                            <div className="flex gap-2">
                                <Button type="button" variant="secondary" onClick={() => setIsManageModalOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary">
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
