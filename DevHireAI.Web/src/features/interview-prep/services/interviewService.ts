import { apiRequest } from '../../../api/client';
import { ENDPOINTS } from '../../../api/endpoints';
import type { InterviewCheatSheetRequest, InterviewCheatSheetResponse } from '../types/interview.types';

export const interviewService = {
    generateCheatSheet(data: InterviewCheatSheetRequest): Promise<InterviewCheatSheetResponse> {
        return apiRequest<InterviewCheatSheetResponse>(ENDPOINTS.INTERVIEW_CHEATSHEET, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
};
