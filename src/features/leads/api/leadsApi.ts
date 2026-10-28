import { apiClient } from "../../../shared/api/apiClient";
import { GeneratedLeadEmailResponse, SendLeadEmailPayload, SendLeadEmailResponse } from "../types";

export const leadsApi = {
    generateEmail: async (
        agencyId: string | number,
        leadId: string | number
    ): Promise<GeneratedLeadEmailResponse> => {
        const response = await apiClient.post<GeneratedLeadEmailResponse>(
            `/api/v1/agency/leads/${leadId}/generate-email/`,
            {},
            {
                headers: { "X-Agency-ID": String(agencyId) },
            }
        );
        return response.data;
    },

    sendEmail: async (
        agencyId: string | number,
        leadId: string | number,
        payload: SendLeadEmailPayload
    ): Promise<SendLeadEmailResponse> => {
        const response = await apiClient.post<SendLeadEmailResponse>(
            `/api/v1/agency/leads/${leadId}/send-email/`,
            payload,
            {
                headers: { "X-Agency-ID": String(agencyId) },
            }
        );
        return response.data;
    },
};
