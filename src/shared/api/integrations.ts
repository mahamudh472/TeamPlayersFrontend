import { apiClient } from "./apiClient";

export interface IntegrationMetadata {
    email?: string;
    display_name?: string;
    zoom_user_id?: string;
    account_id?: string;
    [key: string]: any;
}

export interface Integration {
    id: string | null;
    provider: "zoom" | "microsoft" | "google_calendar" | string;
    name: string;
    is_connected: boolean;
    connected_at: string | null;
    metadata: IntegrationMetadata;
    created_at: string | null;
    updated_at: string | null;
}

export interface ConnectAuthResponse {
    auth_url: string;
}

export interface CreateZoomMeetingPayload {
    topic: string;
    start_time: string; // ISO 8601
    duration: number; // minutes (1-1440)
    agenda?: string;
}

export interface ZoomMeetingDetails {
    id: number | string;
    topic: string;
    start_time: string;
    duration: number;
    join_url: string;
    start_url: string;
    password?: string;
}

export interface CreateZoomMeetingResponse {
    message: string;
    meeting: ZoomMeetingDetails;
}

export interface DisconnectResponse {
    message: string;
}

export interface SendMicrosoftEmailPayload {
    recipient_email: string;
    subject: string;
    body: string;
    content_type?: "Text" | "HTML";
}

export interface SendMicrosoftEmailResponse {
    message: string;
}

export interface CreateMicrosoftCalendarEventPayload {
    subject: string;
    start_time: string; // ISO 8601
    end_time?: string; // ISO 8601
    duration?: number; // minutes (1-1440, default: 60)
    body?: string;
    location?: string;
}

export interface MicrosoftCalendarEventDetails {
    id: string;
    subject: string;
    start: {
        dateTime: string;
        timeZone: string;
    };
    end: {
        dateTime: string;
        timeZone: string;
    };
    web_link?: string;
    location?: string;
}

export interface CreateMicrosoftCalendarEventResponse {
    message: string;
    event: MicrosoftCalendarEventDetails;
}

export const integrationsApi = {
    /**
     * List all connected integrations for the authenticated user in the specified agency
     */
    listIntegrations: async (agencyId: string | number): Promise<Integration[]> => {
        const response = await apiClient.get<Integration[]>("/api/v1/integrations/", {
            headers: { "X-Agency-ID": String(agencyId) },
        });
        return response.data;
    },

    /**
     * List all available integrations (Zoom, Microsoft, Google Calendar) and their connection status
     */
    getAvailableIntegrations: async (agencyId: string | number): Promise<Integration[]> => {
        const response = await apiClient.get<Integration[]>("/api/v1/integrations/available/", {
            headers: { "X-Agency-ID": String(agencyId) },
        });
        return response.data;
    },

    /**
     * Get OAuth authorization URL for Zoom
     */
    getZoomAuthUrl: async (agencyId: string | number): Promise<ConnectAuthResponse> => {
        const response = await apiClient.get<ConnectAuthResponse>("/api/v1/integrations/zoom/connect/", {
            headers: { "X-Agency-ID": String(agencyId) },
        });
        return response.data;
    },

    /**
     * Disconnect Zoom integration
     */
    disconnectZoom: async (agencyId: string | number): Promise<DisconnectResponse> => {
        const response = await apiClient.post<DisconnectResponse>(
            "/api/v1/integrations/zoom/disconnect/",
            {},
            {
                headers: { "X-Agency-ID": String(agencyId) },
            }
        );
        return response.data;
    },

    /**
     * Create a scheduled Zoom meeting
     */
    createZoomMeeting: async (
        agencyId: string | number,
        payload: CreateZoomMeetingPayload
    ): Promise<CreateZoomMeetingResponse> => {
        const response = await apiClient.post<CreateZoomMeetingResponse>(
            "/api/v1/integrations/zoom/meetings/create/",
            payload,
            {
                headers: { "X-Agency-ID": String(agencyId) },
            }
        );
        return response.data;
    },

    /**
     * Get OAuth 2.0 authorization URL for Microsoft
     */
    getMicrosoftAuthUrl: async (agencyId: string | number): Promise<ConnectAuthResponse> => {
        const response = await apiClient.get<ConnectAuthResponse>("/api/v1/integrations/microsoft/connect/", {
            headers: { "X-Agency-ID": String(agencyId) },
        });
        return response.data;
    },

    /**
     * Disconnect Microsoft integration
     */
    disconnectMicrosoft: async (agencyId: string | number): Promise<DisconnectResponse> => {
        const response = await apiClient.post<DisconnectResponse>(
            "/api/v1/integrations/microsoft/disconnect/",
            {},
            {
                headers: { "X-Agency-ID": String(agencyId) },
            }
        );
        return response.data;
    },

    /**
     * Send email via connected Microsoft (Outlook) account
     */
    sendMicrosoftEmail: async (
        agencyId: string | number,
        payload: SendMicrosoftEmailPayload
    ): Promise<SendMicrosoftEmailResponse> => {
        const response = await apiClient.post<SendMicrosoftEmailResponse>(
            "/api/v1/integrations/microsoft/mail/send/",
            payload,
            {
                headers: { "X-Agency-ID": String(agencyId) },
            }
        );
        return response.data;
    },

    /**
     * Create calendar event via connected Microsoft (Outlook) Calendar
     */
    createMicrosoftCalendarEvent: async (
        agencyId: string | number,
        payload: CreateMicrosoftCalendarEventPayload
    ): Promise<CreateMicrosoftCalendarEventResponse> => {
        const response = await apiClient.post<CreateMicrosoftCalendarEventResponse>(
            "/api/v1/integrations/microsoft/calendar/events/create/",
            payload,
            {
                headers: { "X-Agency-ID": String(agencyId) },
            }
        );
        return response.data;
    },

    /**
     * Generic connect helper by provider name
     */
    getConnectAuthUrl: async (
        provider: string,
        agencyId: string | number
    ): Promise<ConnectAuthResponse> => {
        const response = await apiClient.get<ConnectAuthResponse>(`/api/v1/integrations/${provider}/connect/`, {
            headers: { "X-Agency-ID": String(agencyId) },
        });
        return response.data;
    },

    /**
     * Generic disconnect helper by provider name
     */
    disconnectProvider: async (
        provider: string,
        agencyId: string | number
    ): Promise<DisconnectResponse> => {
        const response = await apiClient.post<DisconnectResponse>(
            `/api/v1/integrations/${provider}/disconnect/`,
            {},
            {
                headers: { "X-Agency-ID": String(agencyId) },
            }
        );
        return response.data;
    },
};
