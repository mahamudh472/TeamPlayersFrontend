import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { Typography, Button, Input } from "../../../components/ui";
import {
    X,
    Mail,
    Send,
    Sparkles,
    AlertCircle,
    CheckCircle2,
    Building2,
    RefreshCw,
    ExternalLink,
    User,
} from "lucide-react";
import { Lead, LeadDetailItem } from "../types";
import { leadsApi } from "../api/leadsApi";
import { integrationsApi } from "../../../shared/api/integrations";
import { useAuth } from "../../../shared/context/AuthContext";
import { useToast } from "../../../shared/context/ToastContext";

interface ContactLeadModalProps {
    isOpen: boolean;
    lead: Lead | LeadDetailItem | null;
    agencyId?: string | number | null;
    onClose: () => void;
    onEmailSent?: () => void;
}

export const ContactLeadModal: React.FC<ContactLeadModalProps> = ({
    isOpen,
    lead,
    agencyId: propAgencyId,
    onClose,
    onEmailSent,
}) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { toast } = useToast();

    const activeAgencyId =
        propAgencyId || localStorage.getItem("selected_agency_id") || user?.agency_id;

    // Form state
    const [recipientEmail, setRecipientEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    // Status states
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [generationError, setGenerationError] = useState<string | null>(null);
    const [sendError, setSendError] = useState<string | null>(null);

    // Email account connection state
    const [isEmailConnected, setIsEmailConnected] = useState<boolean | null>(null);
    const [isCheckingIntegration, setIsCheckingIntegration] = useState(false);

    // Check if the user has an email account connected
    const checkEmailIntegration = useCallback(async () => {
        if (!activeAgencyId) return;
        try {
            setIsCheckingIntegration(true);
            const integrations = await integrationsApi.getAvailableIntegrations(activeAgencyId);
            const msIntegration = integrations.find(
                (item) => item.provider === "microsoft"
            );
            setIsEmailConnected(!!msIntegration?.is_connected);
        } catch (err) {
            console.warn("Failed to check email integration status:", err);
            // Default to null if cannot verify ahead of time; backend will validate on send
            setIsEmailConnected(null);
        } finally {
            setIsCheckingIntegration(false);
        }
    }, [activeAgencyId]);

    // Generate AI email draft
    const handleGenerateEmail = useCallback(async () => {
        if (!lead?.id || !activeAgencyId) return;

        setIsGenerating(true);
        setGenerationError(null);
        setSendError(null);

        try {
            const data = await leadsApi.generateEmail(activeAgencyId, lead.id);
            setSubject(data.subject || "");
            setBody(data.body || "");
            if (data.recipient_email && !recipientEmail) {
                setRecipientEmail(data.recipient_email);
            }
        } catch (err: any) {
            console.error("Failed to generate AI email:", err);
            const errMsg =
                err.response?.data?.error ||
                err.response?.data?.detail ||
                "Failed to generate email draft with AI. You can write your own or retry.";
            setGenerationError(errMsg);
        } finally {
            setIsGenerating(false);
        }
    }, [lead?.id, activeAgencyId, recipientEmail]);

    // Initial setup on open
    useEffect(() => {
        if (isOpen && lead) {
            setRecipientEmail(lead.contactEmail || "");
            setSubject("");
            setBody("");
            setGenerationError(null);
            setSendError(null);

            checkEmailIntegration();
            handleGenerateEmail();
        }
    }, [isOpen, lead?.id]);

    if (!isOpen || !lead) return null;

    const extractErrorMessage = (err: any): string => {
        if (!err.response?.data) {
            return err.message || "An unexpected error occurred. Please try again.";
        }
        const data = err.response.data;
        if (typeof data === "string") return data;
        if (data.error) return data.error;
        if (data.detail) return data.detail;

        // Field errors { field: ["error1", "error2"] }
        const messages: string[] = [];
        for (const [key, val] of Object.entries(data)) {
            if (Array.isArray(val)) {
                messages.push(`${key}: ${val.join(", ")}`);
            } else if (typeof val === "string") {
                messages.push(`${key}: ${val}`);
            }
        }
        if (messages.length > 0) return messages.join(" | ");

        return "Failed to send email. Please check your inputs and email connection.";
    };

    const handleSendEmail = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!activeAgencyId) {
            toast.error("Agency selection is required");
            return;
        }

        const trimmedEmail = recipientEmail.trim();
        if (!trimmedEmail) {
            setSendError("Recipient email is required.");
            toast.error("Please provide a recipient email address.");
            return;
        }

        if (!subject.trim()) {
            setSendError("Email subject cannot be empty.");
            toast.error("Please provide a subject line.");
            return;
        }

        if (!body.trim()) {
            setSendError("Email body cannot be empty.");
            toast.error("Please provide an email message.");
            return;
        }

        setIsSending(true);
        setSendError(null);

        try {
            const res = await leadsApi.sendEmail(activeAgencyId, lead.id, {
                recipient_email: trimmedEmail,
                subject: subject.trim(),
                body: body.trim(),
            });

            toast.success(res.message || `Email sent successfully to ${trimmedEmail}!`);
            onEmailSent?.();
            onClose();
        } catch (err: any) {
            console.error("Failed to send email:", err);
            const errMsg = extractErrorMessage(err);
            setSendError(errMsg);
            toast.error(errMsg);

            // If account is not connected, reflect in state
            if (
                errMsg.toLowerCase().includes("connect") ||
                err.response?.data?.code === "EMAIL_NOT_CONNECTED"
            ) {
                setIsEmailConnected(false);
            }
        } finally {
            setIsSending(false);
        }
    };

    const isMissingEmailSetup = isEmailConnected === false;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in-0 duration-200">
            {/* Backdrop click */}
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-btn-sec-border shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="p-6 border-b border-btn-sec-border bg-slate-50/60 flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                                <Sparkles className="w-3.5 h-3.5" />
                                AI Outreach
                            </span>
                            <span className="text-xs text-muted-text font-medium">
                                Lead Contact
                            </span>
                        </div>
                        <Typography variant="h3" className="font-bold text-text-main text-xl">
                            Contact {lead.company}
                        </Typography>
                        <p className="text-xs text-muted-text mt-0.5 flex items-center gap-2">
                            {lead.contactName ? (
                                <span className="flex items-center gap-1">
                                    <User className="w-3 h-3 text-slate-400" />
                                    {lead.contactName}
                                </span>
                            ) : null}
                            {lead.industry ? (
                                <span className="flex items-center gap-1">
                                    <Building2 className="w-3 h-3 text-slate-400" />
                                    {lead.industry}
                                </span>
                            ) : null}
                        </p>
                    </div>

                    <Button
                        type="button"
                        variant="icon"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>

                {/* Body Content */}
                <form
                    onSubmit={handleSendEmail}
                    className="p-6 overflow-y-auto space-y-5 flex-1 text-left"
                >
                    {/* Email connection warning banner if not connected */}
                    {isMissingEmailSetup && (
                        <div className="p-3.5 bg-amber-50/90 border border-amber-200 rounded-xl flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                            <div className="flex-1 text-xs">
                                <p className="font-semibold text-amber-900">
                                    Email Account Not Connected
                                </p>
                                <p className="text-amber-700 mt-0.5">
                                    Your email account is not connected yet. In order to send outreach emails directly from TeamPlayers, please connect your Microsoft Outlook account in Settings.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => navigate("/settings")}
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 hover:text-amber-950 underline mt-2 cursor-pointer"
                                >
                                    Go to Settings &gt; Integrations
                                    <ExternalLink className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Send Error Notice */}
                    {sendError && (
                        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                            <div className="flex-1 text-xs">
                                <p className="font-semibold text-red-800">
                                    Could Not Send Email
                                </p>
                                <p className="text-red-700 mt-0.5">{sendError}</p>
                                {sendError.toLowerCase().includes("connect") && (
                                    <button
                                        type="button"
                                        onClick={() => navigate("/settings")}
                                        className="inline-flex items-center gap-1 font-semibold text-red-800 hover:text-red-950 underline mt-2 cursor-pointer"
                                    >
                                        Connect your email in Settings
                                        <ExternalLink className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Recipient Email Field */}
                    <div>
                        <Input
                            label="Recipient Email"
                            type="email"
                            placeholder="lead.contact@company.com"
                            prefixIcon={Mail}
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
                            helperText={
                                !recipientEmail
                                    ? "No email found on this lead profile. Please enter the recipient's email address."
                                    : "Outreach email will be delivered to this address."
                            }
                            required
                        />
                    </div>

                    {/* Subject Line Field */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-text-main">
                                Subject Line
                            </label>
                            {isGenerating && (
                                <span className="inline-flex items-center gap-1 text-xs text-primary font-medium animate-pulse">
                                    <Sparkles className="w-3 h-3" />
                                    AI is drafting...
                                </span>
                            )}
                        </div>

                        {isGenerating ? (
                            <div className="w-full h-10 px-3.5 rounded-lg border border-primary/30 bg-primary/5 flex items-center gap-2 animate-pulse">
                                <Sparkles className="w-4 h-4 text-primary animate-spin" />
                                <span className="text-xs text-primary font-medium">
                                    Generating personalized subject line...
                                </span>
                            </div>
                        ) : (
                            <Input
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="e.g. Partnering with Acme on engineering hiring"
                                required
                            />
                        )}
                    </div>

                    {/* Email Body Field */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-text-main">
                                Email Message Body
                            </label>

                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                prefixIcon={isGenerating ? RefreshCw : Sparkles}
                                disabled={isGenerating}
                                onClick={handleGenerateEmail}
                                className={`text-xs text-primary hover:text-primary hover:bg-primary/10 ${
                                    isGenerating ? "opacity-60 cursor-not-allowed" : ""
                                }`}
                            >
                                {isGenerating ? "Regenerating..." : "Regenerate with AI"}
                            </Button>
                        </div>

                        {isGenerating ? (
                            <div className="w-full rounded-xl border border-primary/30 bg-primary/5 p-5 space-y-3 animate-pulse">
                                <div className="flex items-center gap-2 text-primary font-semibold text-xs">
                                    <Sparkles className="w-4 h-4 text-primary animate-bounce" />
                                    <span>AI Assistant reading lead insights & crafting outreach...</span>
                                </div>
                                <div className="space-y-2 pt-2">
                                    <div className="h-3.5 bg-primary/20 rounded-md w-3/4"></div>
                                    <div className="h-3.5 bg-primary/15 rounded-md w-full"></div>
                                    <div className="h-3.5 bg-primary/15 rounded-md w-5/6"></div>
                                    <div className="h-3.5 bg-primary/10 rounded-md w-2/3"></div>
                                </div>
                                <p className="text-[11px] text-muted-text italic pt-1">
                                    Tailoring greeting, company reference, value proposition, and call to action...
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <textarea
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    placeholder="Write or edit your outreach email message here..."
                                    rows={10}
                                    className="w-full resize-y rounded-xl border border-btn-sec-border bg-white px-3.5 py-3 text-sm text-text-main leading-relaxed outline-none transition-all duration-200 placeholder:text-light-text focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    required
                                />
                                <div className="flex items-center justify-between text-[11px] text-muted-text px-1">
                                    <span>You can freely edit the AI generated text above before sending.</span>
                                    <span>{body.length} characters</span>
                                </div>
                            </div>
                        )}

                        {/* Generation Error notice */}
                        {generationError && !isGenerating && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between text-xs text-red-700">
                                <span>{generationError}</span>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleGenerateEmail}
                                    className="text-xs"
                                >
                                    Retry AI
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-btn-sec-border flex items-center justify-between gap-3">
                        <div className="text-xs text-muted-text flex items-center gap-1.5">
                            {isEmailConnected === true && (
                                <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    Connected to Outlook
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={onClose}
                                disabled={isSending}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="primary"
                                prefixIcon={Send}
                                loading={isSending}
                                disabled={
                                    isGenerating ||
                                    isSending ||
                                    !recipientEmail.trim() ||
                                    !subject.trim() ||
                                    !body.trim()
                                }
                            >
                                {isSending ? "Sending Email..." : "Send Email"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
