import React, { useState } from "react";
import { Typography, Button, Input } from "../../../components/ui";
import {
    X,
    Mail,
    Calendar,
    Send,
    CalendarPlus,
    CheckCircle2,
    AlertCircle,
    ExternalLink,
    Clock,
    MapPin,
    RefreshCw,
} from "lucide-react";
import {
    integrationsApi,
    CreateMicrosoftCalendarEventResponse,
} from "../../../shared/api/integrations";
import { useToast } from "../../../shared/context/ToastContext";

interface TestMicrosoftModalProps {
    isOpen: boolean;
    onClose: () => void;
    agencyId?: string | number | null;
    userEmail?: string;
}

export const TestMicrosoftModal: React.FC<TestMicrosoftModalProps> = ({
    isOpen,
    onClose,
    agencyId,
    userEmail = "",
}) => {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<"mail" | "calendar">("mail");

    // Email state
    const [recipientEmail, setRecipientEmail] = useState(userEmail || "");
    const [emailSubject, setEmailSubject] = useState("Interview Invitation - TeamPlayers Test");
    const [contentType, setContentType] = useState<"Text" | "HTML">("Text");
    const [emailBody, setEmailBody] = useState(
        "Hello,\n\nWe would like to invite you for an interview.\n\nBest regards,\nTeam"
    );
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [emailSuccessMessage, setEmailSuccessMessage] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);

    // Calendar state
    const getDefaultStartTime = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(14, 0, 0, 0);
        // Format to YYYY-MM-DDTHH:mm for datetime-local
        const pad = (n: number) => n.toString().padStart(2, "0");
        return `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth() + 1)}-${pad(
            tomorrow.getDate()
        )}T${pad(tomorrow.getHours())}:${pad(tomorrow.getMinutes())}`;
    };

    const [calendarSubject, setCalendarSubject] = useState("Candidate Technical Interview");
    const [calendarStartTime, setCalendarStartTime] = useState(getDefaultStartTime);
    const [calendarDuration, setCalendarDuration] = useState<number>(60);
    const [calendarLocation, setCalendarLocation] = useState("Microsoft Teams");
    const [calendarBody, setCalendarBody] = useState(
        "Discussion on technical architecture and past experiences."
    );
    const [isCreatingEvent, setIsCreatingEvent] = useState(false);
    const [createdEvent, setCreatedEvent] = useState<CreateMicrosoftCalendarEventResponse["event"] | null>(null);
    const [calendarError, setCalendarError] = useState<string | null>(null);

    if (!isOpen) return null;

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

        return "Request failed. Please check the inputs and try again.";
    };

    const handleSendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agencyId) {
            toast.error("No active agency ID selected.");
            return;
        }

        if (!recipientEmail.trim()) {
            setEmailError("Recipient email address is required.");
            return;
        }

        setIsSendingEmail(true);
        setEmailError(null);
        setEmailSuccessMessage(null);

        try {
            const res = await integrationsApi.sendMicrosoftEmail(agencyId, {
                recipient_email: recipientEmail.trim(),
                subject: emailSubject.trim(),
                body: emailBody,
                content_type: contentType,
            });

            setEmailSuccessMessage(res.message || "Email sent successfully via Microsoft Outlook!");
            toast.success("Test email sent successfully via Outlook!");
        } catch (err: any) {
            console.error("Failed to send test email:", err);
            const msg = extractErrorMessage(err);
            setEmailError(msg);
            toast.error(msg);
        } finally {
            setIsSendingEmail(false);
        }
    };

    const handleCreateCalendarEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agencyId) {
            toast.error("No active agency ID selected.");
            return;
        }

        if (!calendarSubject.trim()) {
            setCalendarError("Event subject is required.");
            return;
        }

        if (!calendarStartTime) {
            setCalendarError("Start time is required.");
            return;
        }

        setIsCreatingEvent(true);
        setCalendarError(null);
        setCreatedEvent(null);

        try {
            // Convert datetime-local to ISO 8601 UTC string
            const startIso = new Date(calendarStartTime).toISOString();

            const res = await integrationsApi.createMicrosoftCalendarEvent(agencyId, {
                subject: calendarSubject.trim(),
                start_time: startIso,
                duration: calendarDuration ? Number(calendarDuration) : 60,
                location: calendarLocation.trim() || undefined,
                body: calendarBody.trim() || undefined,
            });

            setCreatedEvent(res.event);
            toast.success("Calendar event created successfully in Microsoft Calendar!");
        } catch (err: any) {
            console.error("Failed to create calendar event:", err);
            const msg = extractErrorMessage(err);
            setCalendarError(msg);
            toast.error(msg);
        } finally {
            setIsCreatingEvent(false);
        }
    };

    const formatEventTime = (isoString?: string) => {
        if (!isoString) return "";
        try {
            return new Date(isoString).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
            });
        } catch {
            return isoString;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in-0 duration-200">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="bg-white rounded-xl border border-btn-sec-border shadow-xl w-full max-w-xl relative flex flex-col max-h-[90vh] overflow-hidden z-10 text-left animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-btn-sec-border bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none">
                            <rect x="2" y="2" width="9.5" height="9.5" rx="1.5" fill="#F25022" />
                            <rect x="12.5" y="2" width="9.5" height="9.5" rx="1.5" fill="#7FBA00" />
                            <rect x="2" y="12.5" width="9.5" height="9.5" rx="1.5" fill="#00A4EF" />
                            <rect x="12.5" y="12.5" width="9.5" height="9.5" rx="1.5" fill="#FFB900" />
                        </svg>
                        <div>
                            <Typography variant="h4" className="text-base font-bold text-text-main leading-snug">
                                Test Microsoft Integration
                            </Typography>
                            <Typography variant="body2" className="text-xs text-muted-text">
                                Verify live Outlook mail delivery and Microsoft Calendar scheduling
                            </Typography>
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant="icon"
                        size="sm"
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-700"
                    >
                        <X className="w-4 h-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>

                {/* Tab Navigation */}
                <div className="px-5 pt-3 border-b border-btn-sec-border bg-white flex gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab("mail")}
                        className={`flex items-center gap-2 pb-2.5 px-3 border-b-2 text-sm font-semibold transition-all cursor-pointer ${
                            activeTab === "mail"
                                ? "border-primary text-primary"
                                : "border-transparent text-slate-500 hover:text-slate-900"
                        }`}
                    >
                        <Mail className="w-4 h-4" />
                        <span>Outlook Mail</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("calendar")}
                        className={`flex items-center gap-2 pb-2.5 px-3 border-b-2 text-sm font-semibold transition-all cursor-pointer ${
                            activeTab === "calendar"
                                ? "border-primary text-primary"
                                : "border-transparent text-slate-500 hover:text-slate-900"
                        }`}
                    >
                        <Calendar className="w-4 h-4" />
                        <span>Microsoft Calendar</span>
                    </button>
                </div>

                {/* Tab Body */}
                <div className="p-5 overflow-y-auto space-y-4">
                    {/* Outlook Mail Tab */}
                    {activeTab === "mail" && (
                        <form onSubmit={handleSendEmail} className="space-y-4">
                            {emailSuccessMessage && (
                                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-2.5 text-xs text-emerald-800 animate-in fade-in-50">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">{emailSuccessMessage}</p>
                                        <p className="text-emerald-700 mt-0.5">
                                            The message was dispatched through the user's Microsoft Graph mailbox.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {emailError && (
                                <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-800 animate-in fade-in-50">
                                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Failed to send email</p>
                                        <p className="text-red-700 mt-0.5 break-words">{emailError}</p>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-semibold text-text-main">
                                        Recipient Email <span className="text-red-500">*</span>
                                    </label>
                                    {userEmail && recipientEmail !== userEmail && (
                                        <button
                                            type="button"
                                            onClick={() => setRecipientEmail(userEmail)}
                                            className="text-[11px] text-primary hover:underline font-medium cursor-pointer"
                                        >
                                            Use my email ({userEmail})
                                        </button>
                                    )}
                                </div>
                                <Input
                                    type="email"
                                    placeholder="candidate@example.com"
                                    value={recipientEmail}
                                    onChange={(e) => setRecipientEmail(e.target.value)}
                                    required
                                    prefixIcon={Mail}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-text-main">
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Email Subject"
                                    maxLength={255}
                                    value={emailSubject}
                                    onChange={(e) => setEmailSubject(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-text-main block">
                                    Format
                                </label>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setContentType("Text")}
                                        className={`px-3 py-1.5 text-xs rounded-md border font-medium cursor-pointer transition-colors ${
                                            contentType === "Text"
                                                ? "bg-primary text-white border-primary shadow-xs"
                                                : "bg-white text-slate-700 border-btn-sec-border hover:bg-slate-50"
                                        }`}
                                    >
                                        Plain Text
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setContentType("HTML")}
                                        className={`px-3 py-1.5 text-xs rounded-md border font-medium cursor-pointer transition-colors ${
                                            contentType === "HTML"
                                                ? "bg-primary text-white border-primary shadow-xs"
                                                : "bg-white text-slate-700 border-btn-sec-border hover:bg-slate-50"
                                        }`}
                                    >
                                        HTML
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-text-main">
                                    Message Body <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    rows={4}
                                    value={emailBody}
                                    onChange={(e) => setEmailBody(e.target.value)}
                                    required
                                    className="w-full p-3 rounded-lg border border-btn-sec-border text-xs text-text-main focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 resize-y font-sans placeholder:text-light-text"
                                    placeholder="Type the message body here..."
                                />
                            </div>

                            <div className="pt-2 flex justify-end gap-2.5">
                                <Button type="button" variant="secondary" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    loading={isSendingEmail}
                                    prefixIcon={Send}
                                    className="gap-1.5"
                                >
                                    Send Test Email
                                </Button>
                            </div>
                        </form>
                    )}

                    {/* Microsoft Calendar Tab */}
                    {activeTab === "calendar" && (
                        <form onSubmit={handleCreateCalendarEvent} className="space-y-4">
                            {createdEvent && (
                                <div className="p-4 bg-emerald-50/90 border border-emerald-200 rounded-lg space-y-3 animate-in fade-in-50">
                                    <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                        <span>Calendar Event Created Successfully!</span>
                                    </div>
                                    <div className="bg-white p-3 rounded border border-emerald-100 text-xs space-y-1.5 text-slate-700">
                                        <div className="font-semibold text-slate-900 text-sm">
                                            {createdEvent.subject}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-slate-600">
                                            <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                            <span>
                                                {formatEventTime(createdEvent.start?.dateTime)} –{" "}
                                                {formatEventTime(createdEvent.end?.dateTime)}
                                            </span>
                                        </div>
                                        {createdEvent.location && (
                                            <div className="flex items-center gap-1.5 text-slate-600">
                                                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                                <span>{createdEvent.location}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between pt-1">
                                        {createdEvent.web_link ? (
                                            <a
                                                href={createdEvent.web_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
                                            >
                                                <span>View in Outlook Calendar</span>
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        ) : (
                                            <span />
                                        )}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCreatedEvent(null)}
                                            className="text-xs h-7 px-2.5 text-slate-600 gap-1"
                                            prefixIcon={RefreshCw}
                                        >
                                            Create Another
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {calendarError && (
                                <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-800 animate-in fade-in-50">
                                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Failed to create calendar event</p>
                                        <p className="text-red-700 mt-0.5 break-words">{calendarError}</p>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-text-main">
                                    Event Subject / Title <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="text"
                                    placeholder="e.g. Candidate Technical Interview"
                                    maxLength={255}
                                    value={calendarSubject}
                                    onChange={(e) => setCalendarSubject(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-text-main">
                                        Start Time <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="datetime-local"
                                        value={calendarStartTime}
                                        onChange={(e) => setCalendarStartTime(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-text-main">
                                        Duration (minutes)
                                    </label>
                                    <Input
                                        type="number"
                                        min={1}
                                        max={1440}
                                        placeholder="60"
                                        value={calendarDuration}
                                        onChange={(e) => setCalendarDuration(parseInt(e.target.value) || 60)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-text-main">
                                    Location
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Online (Teams / Zoom) or Office"
                                    maxLength={255}
                                    value={calendarLocation}
                                    onChange={(e) => setCalendarLocation(e.target.value)}
                                    prefixIcon={MapPin}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-text-main">
                                    Description / Agenda
                                </label>
                                <textarea
                                    rows={3}
                                    maxLength={2000}
                                    value={calendarBody}
                                    onChange={(e) => setCalendarBody(e.target.value)}
                                    className="w-full p-3 rounded-lg border border-btn-sec-border text-xs text-text-main focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 resize-y font-sans placeholder:text-light-text"
                                    placeholder="Discussion on technical architecture and past experiences."
                                />
                            </div>

                            <div className="pt-2 flex justify-end gap-2.5">
                                <Button type="button" variant="secondary" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    loading={isCreatingEvent}
                                    prefixIcon={CalendarPlus}
                                    className="gap-1.5"
                                >
                                    Create Calendar Event
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
