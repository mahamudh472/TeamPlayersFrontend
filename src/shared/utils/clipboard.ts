/**
 * Reusable utility to copy text to clipboard with fallback for non-secure contexts.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error("Clipboard API failed, falling back to document.execCommand:", err);
        }
    }

    // Fallback logic
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Prevent scrolling and make it invisible
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        return successful;
    } catch (err) {
        console.error("Fallback copy failed:", err);
        document.body.removeChild(textArea);
        return false;
    }
};
