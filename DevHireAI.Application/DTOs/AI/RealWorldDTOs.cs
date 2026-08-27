namespace DevHireAI.Application.DTOs.AI;

public class AtsOptimizationRequest
{
    public string ResumeText { get; set; } = string.Empty;
    public string JobDescription { get; set; } = string.Empty;
    public string TargetCompany { get; set; } = string.Empty;
}

public class AtsOptimizationResponse
{
    public int AtsScore { get; set; }
    public List<string> CriticalMissingKeywords { get; set; } = new();
    public List<string> FormatWarnings { get; set; } = new();
    public List<string> OptimizedBulletPoints { get; set; } = new();
    public string PersonalizedLinkedInMessage { get; set; } = string.Empty;
    public string TailoredCoverLetter { get; set; } = string.Empty;
}

public class InterviewCheatSheetRequest
{
    public string TargetCompany { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
    public string TechStack { get; set; } = string.Empty;
}

public class InterviewCheatSheetResponse
{
    public string TargetCompany { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
    public List<string> CoreConceptsToRevise { get; set; } = new();
    public List<string> LikelySystemDesignTopics { get; set; } = new();
    public List<BehavioralQuestionDto> BehavioralQuestions { get; set; } = new();
    public List<string> LastMinuteTips { get; set; } = new();
}

public class BehavioralQuestionDto
{
    public string Question { get; set; } = string.Empty;
    public string RecommendedStarAnswer { get; set; } = string.Empty;
}

public class CandidateBatchItem
{
    public string CandidateName { get; set; } = string.Empty;
    public string ResumeText { get; set; } = string.Empty;
}

public class BatchRankingRequest
{
    public string JobDescription { get; set; } = string.Empty;
    public List<CandidateBatchItem> Candidates { get; set; } = new();
}

public class CandidateRankResult
{
    public int Rank { get; set; }
    public string CandidateName { get; set; } = string.Empty;
    public int MatchScore { get; set; }
    public string Seniority { get; set; } = string.Empty;
    public List<string> TopMatchingSkills { get; set; } = new();
    public string KeyRecommendation { get; set; } = string.Empty;
}

public class BatchRankingResponse
{
    public int TotalCandidatesEvaluated { get; set; }
    public List<CandidateRankResult> Leaderboard { get; set; } = new();
}
