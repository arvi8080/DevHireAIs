using DevHireAI.Application.DTOs.AI;
using DevHireAI.Application.Interfaces.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace DevHireAI.Infrastructure.Services;

public class AIService : IAIService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<AIService> _logger;
    private readonly HttpClient _httpClient;

    public AIService(IConfiguration configuration, ILogger<AIService> logger)
    {
        _configuration = configuration;
        _logger = logger;
        _httpClient = new HttpClient();
    }

    public async Task<ResumeAnalysisResponse> AnalyzeResumeAsync(ResumeAnalysisRequest request)
    {
        var apiKey = _configuration["Gemini:ApiKey"];
        
        if (!string.IsNullOrEmpty(apiKey))
        {
            try
            {
                var geminiResult = await AnalyzeWithGeminiAsync(request.ResumeText, request.JobDescription, apiKey);
                if (geminiResult != null) return geminiResult;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Gemini API call failed. Falling back to local AI engine.");
            }
        }

        return AnalyzeLocally(request.ResumeText, request.JobDescription);
    }

    public async Task<ScreeningQuizResponse> GenerateScreeningQuizAsync(ScreeningQuizRequest request)
    {
        var questions = GenerateQuestionsForTechStack(request.JobTitle, request.Skills, request.JobDescription);
        return await Task.FromResult(new ScreeningQuizResponse
        {
            JobTitle = request.JobTitle,
            Questions = questions
        });
    }

    public async Task<GradeQuizResponse> GradeScreeningQuizAsync(GradeQuizRequest request)
    {
        var sampleQuestions = GenerateQuestionsForTechStack(request.JobTitle, new List<string>(), "");
        int score = 0;
        var results = new List<QuestionResultDto>();

        foreach (var q in sampleQuestions)
        {
            var userAnswer = request.Answers.FirstOrDefault(a => a.QuestionId == q.Id);
            int selected = userAnswer?.SelectedOptionIndex ?? -1;
            bool isCorrect = selected == q.CorrectOptionIndex;

            if (isCorrect) score++;

            results.Add(new QuestionResultDto
            {
                QuestionId = q.Id,
                QuestionText = q.QuestionText,
                SelectedOptionIndex = selected,
                CorrectOptionIndex = q.CorrectOptionIndex,
                IsCorrect = isCorrect,
                Explanation = q.Explanation
            });
        }

        int total = sampleQuestions.Count;
        int pct = total == 0 ? 0 : (score * 100) / total;
        string feedback = pct >= 80 ? "Outstanding technical proficiency!" :
                         pct >= 60 ? "Solid foundational knowledge. Some room for improvement." :
                         "Needs further technical preparation in core concepts.";

        return await Task.FromResult(new GradeQuizResponse
        {
            Score = score,
            TotalQuestions = total,
            Percentage = pct,
            Feedback = feedback,
            Results = results
        });
    }

    // --- REAL WORLD UTILITY #1: ATS OPTIMIZER & LINKEDIN OUTREACH ---
    public async Task<AtsOptimizationResponse> OptimizeForAtsAsync(AtsOptimizationRequest request)
    {
        var analysis = AnalyzeLocally(request.ResumeText ?? "", request.JobDescription ?? "");

        int atsScore = Math.Min(98, Math.Max(30, analysis.MatchPercentage + 5));

        var warnings = new List<string>();
        if ((request.ResumeText ?? "").Length < 300)
            warnings.Add("Resume text is quite short. Add more detailed project impacts and metric-driven achievements.");
        if (!analysis.ExtractedSkills.Contains("Git") && !analysis.ExtractedSkills.Contains("GitHub"))
            warnings.Add("Missing explicit mention of Version Control (Git/GitHub) which ATS filters flag.");
        if (warnings.Count == 0)
            warnings.Add("Formatting looks clean. Ensure headers use standard labels like 'Experience' and 'Skills'.");

        var targetCompany = string.IsNullOrWhiteSpace(request.TargetCompany) ? "the hiring team" : request.TargetCompany;

        var bulletPoints = new List<string>
        {
            $"Engineered scalable RESTful API services utilizing {string.Join(", ", analysis.MatchingSkills.Take(3))}, reducing latency and boosting system response speed.",
            $"Designed and deployed robust database schema models using Entity Framework Core & SQL Server, maintaining 99.9% uptime.",
            $"Architected microservices & containerized application workloads with Docker to optimize CI/CD deployment pipelines."
        };

        var linkedInMessage = $"Hi! I noticed {targetCompany} is currently hiring for a software engineering role matching my background in {string.Join(", ", analysis.MatchingSkills.Take(3))}. I recently built high-throughput backend services and would love to connect for 5 minutes to learn more about your team's goals!";

        var coverLetter = $"Dear Hiring Manager at {targetCompany},\n\nI am writing to express my strong interest in the open software engineering role. With hands-on experience in {string.Join(", ", analysis.MatchingSkills.Take(4))}, I have consistently delivered robust, scalable software solutions. In my recent work, I focused on high-performance API design and database optimization. I look forward to contributing my technical skills to {targetCompany}.\n\nBest regards,\nCandidate";

        return await Task.FromResult(new AtsOptimizationResponse
        {
            AtsScore = atsScore,
            CriticalMissingKeywords = analysis.MissingSkills,
            FormatWarnings = warnings,
            OptimizedBulletPoints = bulletPoints,
            PersonalizedLinkedInMessage = linkedInMessage,
            TailoredCoverLetter = coverLetter
        });
    }

    // --- REAL WORLD UTILITY #2: "INTERVIEW TOMORROW" CHEAT SHEET ---
    public async Task<InterviewCheatSheetResponse> GenerateInterviewCheatSheetAsync(InterviewCheatSheetRequest request)
    {
        var company = string.IsNullOrWhiteSpace(request.TargetCompany) ? "Target Tech Company" : request.TargetCompany;
        var stack = string.IsNullOrWhiteSpace(request.TechStack) ? ".NET, SQL, Redis, Docker" : request.TechStack;

        var coreConcepts = new List<string>
        {
            "Memory Management & Garbage Collection: Understand Heap vs Stack allocation, Gen 0/1/2 GC cycles, and `IDisposable` pattern.",
            "Asynchronous Programming: `async/await`, `Task.WhenAll`, avoiding deadlocks with `.ConfigureAwait(false)`.",
            "EF Core Query Optimization: Difference between `IEnumerable` vs `IQueryable`, preventing N+1 queries, and using `.AsNoTracking()`.",
            "Database Indexing: Clustered vs Non-Clustered indexes, index fragmentation, and execution query plans.",
            "API Authentication: JWT Bearer validation, Refresh Token rotation, and CSRF / XSS protection."
        };

        var systemDesign = new List<string>
        {
            "Designing a High-Throughput Rate Limiter Service (Token Bucket algorithm).",
            "Caching Strategy: Cache-aside pattern, Cache Invalidation, handling Cache Stampede with Distributed Redis locks.",
            "Database Sharding & Read-Replicas vs Write-Master scaling."
        };

        var behavioral = new List<BehavioralQuestionDto>
        {
            new BehavioralQuestionDto
            {
                Question = "Tell me about a time you faced a critical production outage or severe bug.",
                RecommendedStarAnswer = "Situation: Production database CPU hit 100%. Task: Restore API responsiveness immediately. Action: Checked slow query logs, identified unindexed query, added non-clustered index and deployed hotfix. Result: Query execution time dropped from 4.2s to 12ms and CPU returned to normal baseline."
            },
            new BehavioralQuestionDto
            {
                Question = "How do you handle disagreement with a senior engineer on system architecture design?",
                RecommendedStarAnswer = "Situation: Disagreed on choosing Monolith vs Microservices for a new service. Task: Align on scalable architecture without hurting velocity. Action: Created benchmark prototype comparing latency, complexity, and deployment speed. Result: Data demonstrated a modular monolith was 3x faster to ship initially with clean boundaries for microservices later."
            }
        };

        var tips = new List<string>
        {
            "Review your top 2 resume projects — be ready to explain the architecture on a whiteboard.",
            "Prepare 3 questions to ask the interviewer about their daily deployment pipelines and tech debt.",
            "Stay calm, think out loud during technical coding questions, and state assumptions clearly."
        };

        return await Task.FromResult(new InterviewCheatSheetResponse
        {
            TargetCompany = company,
            JobTitle = string.IsNullOrWhiteSpace(request.JobTitle) ? "Software Engineer" : request.JobTitle,
            CoreConceptsToRevise = coreConcepts,
            LikelySystemDesignTopics = systemDesign,
            BehavioralQuestions = behavioral,
            LastMinuteTips = tips
        });
    }

    // --- REAL WORLD UTILITY #3: BATCH CANDIDATE RANKING LEADERBOARD ---
    public async Task<BatchRankingResponse> RankCandidatesBatchAsync(BatchRankingRequest request)
    {
        var results = new List<CandidateRankResult>();
        int count = 0;

        foreach (var c in request.Candidates ?? new List<CandidateBatchItem>())
        {
            count++;
            var analysis = AnalyzeLocally(c.ResumeText ?? "", request.JobDescription ?? "");
            results.Add(new CandidateRankResult
            {
                CandidateName = string.IsNullOrWhiteSpace(c.CandidateName) ? $"Candidate #{count}" : c.CandidateName,
                MatchScore = analysis.MatchPercentage,
                Seniority = analysis.CandidateSeniority,
                TopMatchingSkills = analysis.MatchingSkills.Take(4).ToList(),
                KeyRecommendation = analysis.Suggestion
            });
        }

        // Rank by Match Score descending
        var ordered = results.OrderByDescending(r => r.MatchScore).ToList();
        for (int i = 0; i < ordered.Count; i++)
        {
            ordered[i].Rank = i + 1;
        }

        return await Task.FromResult(new BatchRankingResponse
        {
            TotalCandidatesEvaluated = ordered.Count,
            Leaderboard = ordered
        });
    }

    private ResumeAnalysisResponse AnalyzeLocally(string resumeText, string jobDescription)
    {
        var resumeLower = (resumeText ?? "").ToLower();
        var jobLower = (jobDescription ?? "").ToLower();

        var knownSkills = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            { "c#", "C#" }, { ".net", ".NET Core" }, { "asp.net", "ASP.NET Core" },
            { "sql", "SQL Server" }, { "postgresql", "PostgreSQL" }, { "mongodb", "MongoDB" },
            { "entity framework", "Entity Framework" }, { "jwt", "JWT Auth" },
            { "docker", "Docker" }, { "kubernetes", "Kubernetes" }, { "redis", "Redis" },
            { "rabbitmq", "RabbitMQ" }, { "microservices", "Microservices" },
            { "azure", "Azure" }, { "aws", "AWS" }, { "gcp", "Google Cloud" },
            { "git", "Git" }, { "github", "GitHub" }, { "react", "React" },
            { "angular", "Angular" }, { "vue", "Vue.js" }, { "typescript", "TypeScript" },
            { "javascript", "JavaScript" }, { "python", "Python" }, { "rest api", "RESTful APIs" },
            { "graphql", "GraphQL" }, { "ci/cd", "CI/CD Pipelines" }, { "unit testing", "Unit Testing" }
        };

        var extractedSkills = new HashSet<string>();
        var matchingSkills = new HashSet<string>();
        var missingSkills = new HashSet<string>();

        foreach (var entry in knownSkills)
        {
            bool inResume = resumeLower.Contains(entry.Key);
            bool inJob = jobLower.Contains(entry.Key);

            if (inResume) extractedSkills.Add(entry.Value);

            if (inResume && inJob) matchingSkills.Add(entry.Value);
            else if (inJob && !inResume) missingSkills.Add(entry.Value);
        }

        int totalRequired = matchingSkills.Count + missingSkills.Count;
        int matchPct = totalRequired == 0 ? 85 : (matchingSkills.Count * 100) / totalRequired;

        string seniority = "Mid-Level";
        if (resumeLower.Contains("principal") || resumeLower.Contains("lead") || resumeLower.Contains("architect") || resumeLower.Contains("10+ years") || resumeLower.Contains("8+ years"))
            seniority = "Staff / Architect";
        else if (resumeLower.Contains("senior") || resumeLower.Contains("5+ years") || resumeLower.Contains("6+ years") || resumeLower.Contains("7+ years"))
            seniority = "Senior Engineer";
        else if (resumeLower.Contains("junior") || resumeLower.Contains("intern") || resumeLower.Contains("entry") || resumeLower.Contains("1 year") || resumeLower.Contains("graduate"))
            seniority = "Junior Developer";

        var strengths = new List<string>();
        if (extractedSkills.Contains("C#") || extractedSkills.Contains(".NET Core"))
            strengths.Add("Strong Microsoft .NET ecosystem background");
        if (extractedSkills.Contains("Docker") || extractedSkills.Contains("Kubernetes") || extractedSkills.Contains("Azure"))
            strengths.Add("Cloud & DevOps architecture experience");
        if (extractedSkills.Contains("Microservices") || extractedSkills.Contains("RabbitMQ"))
            strengths.Add("Distributed systems and event-driven architecture");
        if (extractedSkills.Contains("React") || extractedSkills.Contains("TypeScript"))
            strengths.Add("Full-stack engineering capabilities");
        if (strengths.Count == 0)
            strengths.Add("Solid software engineering core skills");

        var keyProjects = ExtractProjectHighlights(resumeText ?? "");

        var interviewQuestions = new List<string>
        {
            $"Can you walk us through your architecture design decisions in your recent software projects?",
            $"How do you optimize performance and database query execution in high-throughput applications?",
            $"In your experience with {string.Join(", ", matchingSkills.Take(3))}, what was the most complex technical bug you diagnosed?",
            $"How do you handle security, authentication (e.g. JWT tokens), and data protection in your APIs?"
        };

        var suggestedQuizzes = GenerateQuestionsForTechStack("Software Engineer", matchingSkills.ToList(), jobDescription ?? "");

        return new ResumeAnalysisResponse
        {
            MatchPercentage = Math.Min(100, Math.Max(15, matchPct)),
            CandidateSeniority = seniority,
            ExtractedSkills = extractedSkills.ToList(),
            MatchingSkills = matchingSkills.ToList(),
            MissingSkills = missingSkills.ToList(),
            Strengths = strengths,
            KeyProjects = keyProjects,
            Suggestion = matchPct >= 80 ? "High Priority Candidate! Excellent match for core role requirements." :
                         matchPct >= 60 ? "Strong Candidate. Good foundational alignment; verify missing tech stack depth during technical interview." :
                         "Moderate Match. Recommend pre-screening assessment on missing core tech skills.",
            InterviewQuestions = interviewQuestions,
            SuggestedQuizzes = suggestedQuizzes
        };
    }

    private List<string> ExtractProjectHighlights(string text)
    {
        var projects = new List<string>();
        if (string.IsNullOrWhiteSpace(text)) return new List<string> { "Enterprise API Platform Development" };

        var lines = text.Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries);
        foreach (var line in lines)
        {
            var l = line.Trim();
            if (l.Length > 20 && l.Length < 120 && (l.StartsWith("-") || l.StartsWith("*") || l.StartsWith("•") || Regex.IsMatch(l, @"(?i)(developed|built|designed|implemented|created)")))
            {
                projects.Add(Regex.Replace(l, @"^[-*•]\s*", ""));
                if (projects.Count >= 3) break;
            }
        }

        if (projects.Count == 0)
        {
            projects.Add("Full-Stack Web Application with Automated CI/CD");
            projects.Add("High-Throughput Microservice & RESTful API Suite");
        }

        return projects;
    }

    private List<QuizQuestionDto> GenerateQuestionsForTechStack(string title, List<string> skills, string jobDesc)
    {
        return new List<QuizQuestionDto>
        {
            new QuizQuestionDto
            {
                Id = 1,
                Category = ".NET / C#",
                QuestionText = "In .NET, what is the main advantage of using `IAsyncEnumerable<T>` over returning `Task<IEnumerable<T>>`?",
                Options = new List<string>
                {
                    "It automatically creates background threads for every item.",
                    "It allows streaming data asynchronously as items become available without buffering the entire result set in memory.",
                    "It forces synchronous execution inside async methods.",
                    "It converts relational database tables into JSON arrays."
                },
                CorrectOptionIndex = 1,
                Explanation = "`IAsyncEnumerable<T>` enables async streaming of data, allowing consumers to yield and process items as they arrive without holding all data in memory."
            },
            new QuizQuestionDto
            {
                Id = 2,
                Category = "Architecture & SQL",
                QuestionText = "How does Entity Framework Core's `AsNoTracking()` method improve query performance?",
                Options = new List<string>
                {
                    "It disables SQL index scans on the database server.",
                    "It prevents EF Core from tracking changes in the DbContext change tracker for read-only queries.",
                    "It executes raw SQL without parameter binding.",
                    "It automatically caches query results in Redis."
                },
                CorrectOptionIndex = 1,
                Explanation = "`AsNoTracking()` informs EF Core not to snapshot or track entity instances in memory, significantly reducing memory allocation and CPU overhead for read-only queries."
            },
            new QuizQuestionDto
            {
                Id = 3,
                Category = "Security & Web API",
                QuestionText = "When storing JWT refresh tokens, which approach provides optimal security against token theft?",
                Options = new List<string>
                {
                    "Store plain text refresh tokens in client `localStorage`.",
                    "Store cryptographically secure hashed refresh tokens in the database and pass them via HTTP-Only, Secure, SameSite cookies.",
                    "Send refresh tokens inside URL query strings.",
                    "Disable token expiry so users never log out."
                },
                CorrectOptionIndex = 1,
                Explanation = "HTTP-Only cookies prevent JavaScript XSS scripts from reading refresh tokens, and hashing them in the database protects against DB leaks."
            },
            new QuizQuestionDto
            {
                Id = 4,
                Category = "DevOps & Containers",
                QuestionText = "In Docker multi-stage builds, what is the primary benefit for production deployments?",
                Options = new List<string>
                {
                    "It runs container builds across multiple cloud providers simultaneously.",
                    "It separates the build environment (with SDK tools) from the final slim runtime image, drastically reducing container size and attack surface.",
                    "It allows running multiple databases inside a single container.",
                    "It automatically generates Kubernetes YAML files."
                },
                CorrectOptionIndex = 1,
                Explanation = "Multi-stage builds leave compiler SDKs and build artifacts out of the final container, keeping production images minimal, lightweight, and secure."
            }
        };
    }

    private async Task<ResumeAnalysisResponse?> AnalyzeWithGeminiAsync(string resumeText, string jobDescription, string apiKey)
    {
        var endpoint = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={apiKey}";

        var prompt = $$"""
        You are an expert technical recruiter and AI resume matcher.
        Analyze the candidate's resume against the job description below.
        Return ONLY valid JSON matching this schema:
        {
          "matchPercentage": 85,
          "candidateSeniority": "Senior Developer",
          "extractedSkills": ["C#", ".NET Core", "SQL Server"],
          "matchingSkills": ["C#", ".NET Core"],
          "missingSkills": ["Docker", "Kubernetes"],
          "strengths": ["Strong backend architecture", "Deep C# expertise"],
          "keyProjects": ["Built high throughput payment gateway"],
          "suggestion": "Great match. Verify cloud skills in interview.",
          "interviewQuestions": ["How did you scale your payment gateway?"]
        }

        RESUME:
        {{resumeText}}

        JOB DESCRIPTION:
        {{jobDescription}}
        """;

        var payload = new
        {
            contents = new[]
            {
                new { parts = new[] { new { text = prompt } } }
            }
        };

        var jsonPayload = JsonSerializer.Serialize(payload);
        var content = new StringContent(jsonPayload, System.Text.Encoding.UTF8, "application/json");

        var response = await _httpClient.PostAsync(endpoint, content);
        if (!response.IsSuccessStatusCode) return null;

        var jsonResponse = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(jsonResponse);
        var rawText = doc.RootElement
            .GetProperty("candidates")[0]
            .GetProperty("content")
            .GetProperty("parts")[0]
            .GetProperty("text").GetString();

        if (string.IsNullOrEmpty(rawText)) return null;

        var cleanedJson = Regex.Replace(rawText, @"```json|```", "").Trim();
        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        return JsonSerializer.Deserialize<ResumeAnalysisResponse>(cleanedJson, options);
    }
}