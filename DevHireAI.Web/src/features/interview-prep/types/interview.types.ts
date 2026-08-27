export interface InterviewCheatSheetRequest {
    targetCompany: string;
    jobTitle: string;
    techStack: string;
}

export interface BehavioralQuestion {
    question: string;
    recommendedStarAnswer: string;
}

export interface InterviewCheatSheetResponse {
    targetCompany: string;
    jobTitle: string;
    coreConceptsToRevise: string[];
    likelySystemDesignTopics: string[];
    behavioralQuestions: BehavioralQuestion[];
    lastMinuteTips: string[];
}
