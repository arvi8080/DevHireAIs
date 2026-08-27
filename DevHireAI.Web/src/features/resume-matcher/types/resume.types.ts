export interface ResumeAnalysisRequest {
    resumeText: string;
    jobDescription: string;
}

export interface QuizQuestionDto {
    id: number;
    questionText: string;
    options: string[];
    correctOptionIndex: number;
    explanation: string;
    category: string;
}

export interface ResumeAnalysisResponse {
    matchPercentage: number;
    candidateSeniority: string;
    extractedSkills: string[];
    matchingSkills: string[];
    missingSkills: string[];
    strengths: string[];
    keyProjects: string[];
    suggestion: string;
    interviewQuestions: string[];
    suggestedQuizzes: QuizQuestionDto[];
}
