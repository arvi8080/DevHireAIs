export interface AtsOptimizationRequest {
    resumeText: string;
    jobDescription: string;
    targetCompany: string;
}

export interface AtsOptimizationResponse {
    atsScore: number;
    criticalMissingKeywords: string[];
    formatWarnings: string[];
    optimizedBulletPoints: string[];
    personalizedLinkedInMessage: string;
    tailoredCoverLetter: string;
}
