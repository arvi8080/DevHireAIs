namespace DevHireAI.Application.DTOs.AI;

public class QuizQuestionDto
{
    public int Id { get; set; }
    public string QuestionText { get; set; } = string.Empty;
    public List<string> Options { get; set; } = new();
    public int CorrectOptionIndex { get; set; }
    public string Explanation { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
}

public class ScreeningQuizRequest
{
    public string JobTitle { get; set; } = string.Empty;
    public string JobDescription { get; set; } = string.Empty;
    public List<string> Skills { get; set; } = new();
}

public class ScreeningQuizResponse
{
    public string QuizId { get; set; } = Guid.NewGuid().ToString();
    public string JobTitle { get; set; } = string.Empty;
    public List<QuizQuestionDto> Questions { get; set; } = new();
}

public class GradeQuizRequest
{
    public string JobTitle { get; set; } = string.Empty;
    public List<QuizAnswerDto> Answers { get; set; } = new();
}

public class QuizAnswerDto
{
    public int QuestionId { get; set; }
    public int SelectedOptionIndex { get; set; }
}

public class GradeQuizResponse
{
    public int Score { get; set; }
    public int TotalQuestions { get; set; }
    public int Percentage { get; set; }
    public string Feedback { get; set; } = string.Empty;
    public List<QuestionResultDto> Results { get; set; } = new();
}

public class QuestionResultDto
{
    public int QuestionId { get; set; }
    public string QuestionText { get; set; } = string.Empty;
    public int SelectedOptionIndex { get; set; }
    public int CorrectOptionIndex { get; set; }
    public bool IsCorrect { get; set; }
    public string Explanation { get; set; } = string.Empty;
}
