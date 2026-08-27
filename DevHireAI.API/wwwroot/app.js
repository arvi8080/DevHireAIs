document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Tabs
    const navBtns = document.querySelectorAll('.nav-btn[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            navBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));

            btn.classList.add('active');
            const targetEl = document.getElementById(`tab-${targetTab}`);
            if (targetEl) targetEl.classList.add('active');
        });
    });

    // --- REAL WORLD FEATURE #1: ATS OPTIMIZER ---
    const btnOptimizeAts = document.getElementById('btn-optimize-ats');
    if (btnOptimizeAts) {
        btnOptimizeAts.addEventListener('click', async () => {
            const targetCompany = document.getElementById('ats-company').value.trim();
            const resumeText = document.getElementById('ats-resume').value.trim();
            const jobDescription = document.getElementById('ats-job').value.trim();

            if (!resumeText || !jobDescription) {
                alert('Please provide both your Resume Text and Target Job Description.');
                return;
            }

            try {
                const response = await fetch('/api/ai/optimize-ats', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ targetCompany, resumeText, jobDescription })
                });

                if (!response.ok) throw new Error('ATS Optimization failed.');
                const data = await response.json();
                renderAtsResults(data);
            } catch (err) {
                alert(err.message);
            }
        });
    }

    function renderAtsResults(data) {
        document.getElementById('ats-empty-state').classList.add('hidden');
        document.getElementById('ats-content').classList.remove('hidden');

        // ATS Score Gauge
        const score = data.atsScore || 0;
        document.getElementById('ats-score-num').textContent = score;
        const circle = document.getElementById('ats-gauge-circle');
        if (circle) {
            const offset = 264 - (score / 100) * 264;
            circle.style.strokeDashoffset = offset;
        }

        // Missing Keywords
        const missingContainer = document.getElementById('ats-missing-keywords');
        missingContainer.innerHTML = (data.criticalMissingKeywords || []).map(k => `<span class="tag tag-danger">${k}</span>`).join('');

        // Bullet points
        const bulletContainer = document.getElementById('ats-bullet-points');
        bulletContainer.innerHTML = (data.optimizedBulletPoints || []).map(b => `<li>${b}</li>`).join('');

        // LinkedIn Message
        document.getElementById('ats-linkedin-msg').textContent = data.personalizedLinkedInMessage || '';

        if (window.lucide) lucide.createIcons();
    }

    // --- REAL WORLD FEATURE #2: INTERVIEW CHEAT SHEET ---
    const btnGenerateCs = document.getElementById('btn-generate-cs');
    if (btnGenerateCs) {
        btnGenerateCs.addEventListener('click', async () => {
            const targetCompany = document.getElementById('cs-company').value.trim();
            const jobTitle = document.getElementById('cs-role').value.trim();
            const techStack = document.getElementById('cs-stack').value.trim();

            try {
                const response = await fetch('/api/ai/interview-cheatsheet', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ targetCompany, jobTitle, techStack })
                });

                if (!response.ok) throw new Error('Failed to generate Cheat Sheet.');
                const data = await response.json();
                renderCheatSheetResults(data);
            } catch (err) {
                alert(err.message);
            }
        });
    }

    function renderCheatSheetResults(data) {
        // Core Concepts
        const conceptsList = document.getElementById('cs-concepts');
        conceptsList.innerHTML = (data.coreConceptsToRevise || []).map(c => `<li>${c}</li>`).join('');

        // System Design Topics
        const sysList = document.getElementById('cs-system-design');
        sysList.innerHTML = (data.likelySystemDesignTopics || []).map(s => `<li>${s}</li>`).join('');

        // Behavioral STAR answers
        const behList = document.getElementById('cs-behavioral');
        behList.innerHTML = (data.behavioralQuestions || []).map(b => `
            <div style="margin-bottom:12px; background:rgba(255,255,255,0.03); padding:10px; border-radius:6px;">
                <p style="font-weight:700; color:#818CF8; font-size:13px;">Q: ${b.question}</p>
                <p style="font-size:12px; color:#D1D5DB; margin-top:4px;">${b.recommendedStarAnswer}</p>
            </div>
        `).join('');

        if (window.lucide) lucide.createIcons();
    }

    // --- REAL WORLD FEATURE #3: BATCH CANDIDATE LEADERBOARD ---
    const btnRunLeaderboard = document.getElementById('btn-run-leaderboard');
    if (btnRunLeaderboard) {
        btnRunLeaderboard.addEventListener('click', async () => {
            const jobDescription = document.getElementById('lb-job').value.trim();

            const sampleCandidates = [
                { candidateName: "Alex Rivera (Senior .NET & Microservices)", resumeText: "Senior Software Engineer with 6 years experience in C#, ASP.NET Core, EF Core, SQL Server, Docker, Kubernetes, Redis, RabbitMQ, and Cloud Architecture." },
                { candidateName: "Sarah Chen (Full Stack React & C#)", resumeText: "Software Engineer with 4 years building full stack web apps using React, TypeScript, C#, ASP.NET Core REST APIs, SQL Server, and Git." },
                { candidateName: "David Miller (Junior C# Developer)", resumeText: "Junior Developer with 1 year experience in C#, ASP.NET, HTML, CSS, JavaScript, and basic SQL database queries." }
            ];

            try {
                const response = await fetch('/api/ai/rank-candidates', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ jobDescription, candidates: sampleCandidates })
                });

                if (!response.ok) throw new Error('Failed to generate leaderboard.');
                const data = await response.json();
                renderLeaderboardResults(data);
            } catch (err) {
                alert(err.message);
            }
        });
    }

    function renderLeaderboardResults(data) {
        const container = document.getElementById('leaderboard-list');
        container.innerHTML = (data.leaderboard || []).map(item => `
            <div class="quiz-card-item" style="border-left: 4px solid ${item.rank === 1 ? '#10B981' : item.rank === 2 ? '#06B6D4' : '#F59E0B'}">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <span class="category-tag">Rank #${item.rank}</span>
                        <h4 style="display:inline; margin-left:8px; font-size:16px;">${item.candidateName}</h4>
                        <span class="seniority-badge" style="display:inline-flex; margin-left:8px;">${item.seniority}</span>
                    </div>
                    <div style="font-size:24px; font-weight:800; color:${item.matchScore >= 80 ? '#10B981' : '#F59E0B'};">
                        ${item.matchScore}%
                    </div>
                </div>
                <p style="font-size:13px; color:#9CA3AF; margin-top:8px;">Top Skills: ${item.topMatchingSkills.join(', ')}</p>
                <p style="font-size:12px; color:#D1D5DB; margin-top:4px; font-style:italic;">Recommendation: ${item.keyRecommendation}</p>
            </div>
        `).join('');
    }

    // Auto load cheat sheet & ATS defaults
    if (btnGenerateCs) btnGenerateCs.click();
    if (btnRunLeaderboard) btnRunLeaderboard.click();
});
