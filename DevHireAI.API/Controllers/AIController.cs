using DevHireAI.Application.DTOs.AI;
using DevHireAI.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace DevHireAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AIController : ControllerBase
{
    private readonly IAIService _aiService;
    private readonly IPdfParserService _pdfParserService;

    public AIController(IAIService aiService, IPdfParserService pdfParserService)
    {
        _aiService = aiService;
        _pdfParserService = pdfParserService;
    }

    [HttpPost("analyze-resume")]
    public async Task<IActionResult> AnalyzeResume([FromBody] ResumeAnalysisRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.ResumeText))
        {
            return BadRequest(new { Message = "ResumeText cannot be empty." });
        }

        var result = await _aiService.AnalyzeResumeAsync(request);
        return Ok(result);
    }

    [HttpPost("upload-and-analyze")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadAndAnalyze([FromForm] IFormFile file, [FromForm] string jobDescription)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new { Message = "Please provide a valid PDF resume file." });
        }

        if (!file.FileName.EndsWith(".pdf", StringComparison.OrdinalIgnoreCase))
        {
            return BadRequest(new { Message = "Only PDF format files are supported." });
        }

        using var stream = file.OpenReadStream();
        string extractedText = await _pdfParserService.ExtractTextAsync(stream);

        if (string.IsNullOrWhiteSpace(extractedText))
        {
            return BadRequest(new { Message = "Failed to extract text from the provided PDF file." });
        }

        var result = await _aiService.AnalyzeResumeAsync(new ResumeAnalysisRequest
        {
            ResumeText = extractedText,
            JobDescription = jobDescription ?? string.Empty
        });

        return Ok(result);
    }

    [HttpPost("screening-quiz")]
    public async Task<IActionResult> GenerateScreeningQuiz([FromBody] ScreeningQuizRequest request)
    {
        var quiz = await _aiService.GenerateScreeningQuizAsync(request);
        return Ok(quiz);
    }

    [HttpPost("grade-quiz")]
    public async Task<IActionResult> GradeScreeningQuiz([FromBody] GradeQuizRequest request)
    {
        var result = await _aiService.GradeScreeningQuizAsync(request);
        return Ok(result);
    }

    // --- REAL WORLD UTILITY ENDPOINTS ---

    [HttpPost("optimize-ats")]
    public async Task<IActionResult> OptimizeForAts([FromBody] AtsOptimizationRequest request)
    {
        var result = await _aiService.OptimizeForAtsAsync(request);
        return Ok(result);
    }

    [HttpPost("interview-cheatsheet")]
    public async Task<IActionResult> GenerateInterviewCheatSheet([FromBody] InterviewCheatSheetRequest request)
    {
        var result = await _aiService.GenerateInterviewCheatSheetAsync(request);
        return Ok(result);
    }

    [HttpPost("rank-candidates")]
    public async Task<IActionResult> RankCandidatesBatch([FromBody] BatchRankingRequest request)
    {
        var result = await _aiService.RankCandidatesBatchAsync(request);
        return Ok(result);
    }
}