import React, { useEffect, useState } from "react";
import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react";

export interface Toast {
    id: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
    duration?: number;
}

interface ToastItemProps {
    toast: Toast;
    onClose: (id: string) => void;
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const duration = toast.duration || 4000;
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [toast.duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose(toast.id);
        }, 150); // Matches .animate-toast-out animation duration
    };

    const icons = {
        success: <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />,
        error: <XCircle className="w-5 h-5 text-rose-500 shrink-0" />,
        warning: <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />,
        info: <Info className="w-5 h-5 text-sky-500 shrink-0" />,
    };

    const borderColors = {
        success: "border-l-4 border-l-primary",
        error: "border-l-4 border-l-rose-500",
        warning: "border-l-4 border-l-amber-500",
        info: "border-l-4 border-l-sky-500",
    };

    return (
        <div
            className={`flex items-start gap-3 w-80 md:w-96 bg-white border border-slate-100 rounded-lg p-4 shadow-lg pointer-events-auto transition-all duration-200 ${
                borderColors[toast.type]
            } ${
                isExiting ? "animate-toast-out" : "animate-toast-in"
            }`}
        >
            {icons[toast.type]}
            <div className="flex-1 text-sm font-medium text-slate-800 break-words pt-0.5">
                {toast.message}
            </div>
            <button
                type="button"
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded hover:bg-slate-100 shrink-0 cursor-pointer"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

interface ToastContainerProps {
    toasts: Toast[];
    onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
    return (
        <div className="fixed top-4 right-4 z-100 flex flex-col gap-2 pointer-events-none max-w-full overflow-hidden px-4">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onClose={onClose} />
            ))}
        </div>
    );
};
