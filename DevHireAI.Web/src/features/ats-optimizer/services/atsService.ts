import { apiRequest } from '../../../api/client';
import { ENDPOINTS } from '../../../api/endpoints';
import type { AtsOptimizationRequest, AtsOptimizationResponse } from '../types/ats.types';

export const atsService = {
    optimizeForAts(data: AtsOptimizationRequest): Promise<AtsOptimizationResponse> {
        return apiRequest<AtsOptimizationResponse>(ENDPOINTS.OPTIMIZE_ATS, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
};
