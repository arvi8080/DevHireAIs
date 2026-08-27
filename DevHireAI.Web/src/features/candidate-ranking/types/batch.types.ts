export interface CandidateBatchItem {
    candidateName: string;
    resumeText: string;
}

export interface BatchRankingRequest {
    jobDescription: string;
    candidates: CandidateBatchItem[];
}

export interface CandidateRankResult {
    rank: number;
    candidateName: string;
    matchScore: number;
    seniority: string;
    topMatchingSkills: string[];
    keyRecommendation: string;
}

export interface BatchRankingResponse {
    totalCandidatesEvaluated: number;
    leaderboard: CandidateRankResult[];
}
