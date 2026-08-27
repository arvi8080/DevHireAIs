import { apiRequest } from '../../../api/client';
import { ENDPOINTS } from '../../../api/endpoints';
import type { BatchRankingRequest, BatchRankingResponse } from '../types/batch.types';

export const batchService = {
    rankCandidates(data: BatchRankingRequest): Promise<BatchRankingResponse> {
        return apiRequest<BatchRankingResponse>(ENDPOINTS.RANK_CANDIDATES, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
};
