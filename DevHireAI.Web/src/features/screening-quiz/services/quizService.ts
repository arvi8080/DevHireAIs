import { apiRequest } from '../../../api/client';
import { ENDPOINTS } from '../../../api/endpoints';
import type { ScreeningQuizRequest, ScreeningQuizResponse, GradeQuizRequest, GradeQuizResponse } from '../types/quiz.types';

export const quizService = {
    generateQuiz(data: ScreeningQuizRequest): Promise<ScreeningQuizResponse> {
        return apiRequest<ScreeningQuizResponse>(ENDPOINTS.SCREENING_QUIZ, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    gradeQuiz(data: GradeQuizRequest): Promise<GradeQuizResponse> {
        return apiRequest<GradeQuizResponse>(ENDPOINTS.GRADE_QUIZ, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
};
