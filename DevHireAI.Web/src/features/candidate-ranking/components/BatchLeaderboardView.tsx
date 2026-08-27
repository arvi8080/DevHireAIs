import React, { useState } from 'react';
import { batchService } from '../services/batchService';
import type { BatchRankingResponse } from '../types/batch.types';
import { Users, Trophy, Play, Sparkles } from 'lucide-react';

export const BatchLeaderboardView: React.FC = () => {
    const [jobDesc, setJobDesc] = useState('Senior .NET Backend Engineer with C#, SQL Server, Docker, and Microservices experience.');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<BatchRankingResponse | null>(null);

    const handleRunBatch = async () => {
        setLoading(true);
        const sampleCandidates = [
            { candidateName: "Alex Rivera (Senior .NET & Microservices)", resumeText: "Senior Software Engineer with 6 years experience in C#, ASP.NET Core, EF Core, SQL Server, Docker, Kubernetes, Redis, RabbitMQ, and Cloud Architecture." },
            { candidateName: "Sarah Chen (Full Stack React & C#)", resumeText: "Software Engineer with 4 years building full stack web apps using React, TypeScript, C#, ASP.NET Core REST APIs, SQL Server, and Git." },
            { candidateName: "David Miller (Junior C# Developer)", resumeText: "Junior Developer with 1 year experience in C#, ASP.NET, HTML, CSS, JavaScript, and basic SQL database queries." }
        ];

        try {
            const data = await batchService.rankCandidates({
                jobDescription: jobDesc,
                candidates: sampleCandidates,
            });
            setResult(data);
        } catch (err: any) {
            alert(err.message || 'Failed to rank candidates.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tab-content active">
            <div className="hero-section">
                <div className="hero-badge"><Sparkles size={14} /> Recruiter Pipeline Assistant</div>
                <h1 className="hero-title">Batch Candidate <span className="gradient-text">Match Leaderboard</span></h1>
                <p className="hero-subtitle">Rank multiple candidate resumes instantly against job requirements to evaluate top tier candidates in seconds.</p>
            </div>

            <div className="glass-card">
                <div className="card-title-row">
                    <Trophy size={20} className="gradient-text" />
                    <span>Candidate Evaluation Pipeline</span>
                </div>

                <div className="form-group margin-top-md">
                    <label>Target Job Requirements</label>
                    <textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} rows={3} />
                </div>

                <button onClick={handleRunBatch} disabled={loading} className="primary-btn margin-top-md">
                    <Play size={17} /> {loading ? 'Ranking Candidates...' : 'Rank Sample Candidate Batch'}
                </button>

                <div className="margin-top-lg">
                    {!result ? (
                        <div className="empty-state">
                            <div className="empty-icon"><Users size={38} /></div>
                            <h3 style={{ color: '#E5E7EB', marginBottom: 6 }}>No Candidate Batch Evaluated</h3>
                            <p>Click above to run batch AI ranking across candidate resumes.</p>
                        </div>
                    ) : (
                        <div className="questions-list">
                            {result.leaderboard.map((item) => (
                                <div key={item.rank} className="quiz-card-item" style={{ borderLeft: `4px solid ${item.rank === 1 ? '#10B981' : item.rank === 2 ? '#06B6D4' : '#F59E0B'}` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span className="category-tag">Rank #{item.rank}</span>
                                            <h4 style={{ display: 'inline', marginLeft: 10, fontSize: 16, color: '#F9FAFB' }}>{item.candidateName}</h4>
                                            <span className="seniority-badge" style={{ display: 'inline-flex', marginLeft: 10 }}>{item.seniority}</span>
                                        </div>
                                        <div style={{ fontSize: 24, fontWeight: 800, color: item.matchScore >= 80 ? '#10B981' : '#F59E0B' }}>
                                            {item.matchScore}%
                                        </div>
                                    </div>
                                    <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 10 }}>Top Skills: {item.topMatchingSkills.join(', ')}</p>
                                    <p style={{ fontSize: 12.5, color: '#D1D5DB', marginTop: 6, fontStyle: 'italic' }}>Recommendation: {item.keyRecommendation}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
