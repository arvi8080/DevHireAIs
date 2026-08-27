import { apiRequest } from '../../../api/client';
import { ENDPOINTS } from '../../../api/endpoints';
import type { ResumeAnalysisRequest, ResumeAnalysisResponse } from '../types/resume.types';

export const resumeService = {
    analyzeResume(data: ResumeAnalysisRequest): Promise<ResumeAnalysisResponse> {
        return apiRequest<ResumeAnalysisResponse>(ENDPOINTS.ANALYZE_RESUME, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    uploadAndAnalyze(file: File, jobDescription: string): Promise<ResumeAnalysisResponse> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('jobDescription', jobDescription);

        return apiRequest<ResumeAnalysisResponse>(ENDPOINTS.UPLOAD_AND_ANALYZE, {
            method: 'POST',
            body: formData,
        });
    },
};
