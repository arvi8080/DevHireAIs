using DevHireAI.Application.DTOs.AI;

namespace DevHireAI.Application.Interfaces.Services;

public interface IAIService
{
    Task<ResumeAnalysisResponse> AnalyzeResumeAsync(ResumeAnalysisRequest request);
    Task<ScreeningQuizResponse> GenerateScreeningQuizAsync(ScreeningQuizRequest request);
    Task<GradeQuizResponse> GradeScreeningQuizAsync(GradeQuizRequest request);
    Task<AtsOptimizationResponse> OptimizeForAtsAsync(AtsOptimizationRequest request);
    Task<InterviewCheatSheetResponse> GenerateInterviewCheatSheetAsync(InterviewCheatSheetRequest request);
    Task<BatchRankingResponse> RankCandidatesBatchAsync(BatchRankingRequest request);
}