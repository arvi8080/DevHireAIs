namespace DevHireAI.Application.DTOs.AI;

public class ResumeAnalysisResponse
{
    public int MatchPercentage { get; set; }

    public string CandidateSeniority { get; set; } = "Mid-Level";

    public List<string> ExtractedSkills { get; set; } = new();

    public List<string> MatchingSkills { get; set; } = new();

    public List<string> MissingSkills { get; set; } = new();

    public List<string> Strengths { get; set; } = new();

    public List<string> KeyProjects { get; set; } = new();

    public string Suggestion { get; set; } = string.Empty;

    public List<string> InterviewQuestions { get; set; } = new();

    public List<QuizQuestionDto> SuggestedQuizzes { get; set; } = new();
}