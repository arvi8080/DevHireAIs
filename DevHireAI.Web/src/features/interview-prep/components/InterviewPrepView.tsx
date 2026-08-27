import React, { useState } from 'react';
import { interviewService } from '../services/interviewService';
import type { InterviewCheatSheetResponse } from '../types/interview.types';
import { BookOpen, Cpu, Network, UserCheck, Sparkles, Building, Layers } from 'lucide-react';

export const InterviewPrepView: React.FC = () => {
    const [company, setCompany] = useState('Netflix');
    const [role, setRole] = useState('Senior Backend Developer');
    const [stack, setStack] = useState('C#, ASP.NET Core, Redis, SQL Server');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<InterviewCheatSheetResponse | null>(null);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const data = await interviewService.generateCheatSheet({
                targetCompany: company,
                jobTitle: role,
                techStack: stack,
            });
            setResult(data);
        } catch (err: any) {
            alert(err.message || 'Failed to generate cheat sheet.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tab-content active">
            <div className="hero-section">
                <div className="hero-badge"><Sparkles size={14} /> AI Interview Copilot</div>
                <h1 className="hero-title"><span className="gradient-text">Interview Tomorrow?</span> Prepare Fast</h1>
                <p className="hero-subtitle">Generate a 1-page company cheat sheet with core technical concepts, system design topics, and STAR behavioral answers tailored to your target company.</p>
            </div>

            <div className="quiz-grid">
                <div className="glass-card">
                    <div className="card-title-row">
                        <BookOpen size={20} className="gradient-text" />
                        <span>Upcoming Interview</span>
                    </div>

                    <div className="form-group margin-top-md">
                        <label><Building size={15} /> Company Name</label>
                        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Netflix, Amazon, Uber" />
                    </div>
                    <div className="form-group">
                        <label><Layers size={15} /> Target Role</label>
                        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Senior Backend Developer" />
                    </div>
                    <div className="form-group">
                        <label><Cpu size={15} /> Required Tech Stack</label>
                        <input type="text" value={stack} onChange={(e) => setStack(e.target.value)} placeholder="e.g. C#, .NET, SQL, Docker" />
                    </div>
                    <button onClick={handleGenerate} disabled={loading} className="accent-btn full-width margin-top-md">
                        <Sparkles size={18} /> {loading ? 'Generating Cheat Sheet...' : 'Generate 1-Page Cheat Sheet'}
                    </button>
                </div>

                <div className="glass-card">
                    {!result ? (
                        <div className="empty-state">
                            <div className="empty-icon"><BookOpen size={38} /></div>
                            <h3 style={{ color: '#E5E7EB', marginBottom: 6 }}>No Study Sheet Generated Yet</h3>
                            <p>Enter your upcoming company and role on the left to generate your technical prep sheet.</p>
                        </div>
                    ) : (
                        <div>
                            <div className="details-box">
                                <h4><Cpu size={17} style={{ color: '#06B6D4' }} /> Core Concepts to Review Tonight</h4>
                                <ul className="custom-list">
                                    {result.coreConceptsToRevise.map((c, i) => <li key={i}>{c}</li>)}
                                </ul>
                            </div>

                            <div className="details-box margin-top-md">
                                <h4><Network size={17} style={{ color: '#818CF8' }} /> Likely System Design Topics</h4>
                                <ul className="custom-list">
                                    {result.likelySystemDesignTopics.map((s, i) => <li key={i}>{s}</li>)}
                                </ul>
                            </div>

                            <div className="details-box margin-top-md">
                                <h4><UserCheck size={17} style={{ color: '#10B981' }} /> Behavioral Questions (STAR Method Answers)</h4>
                                {result.behavioralQuestions.map((b, i) => (
                                    <div key={i} style={{ marginBottom: 12, background: 'rgba(255,255,255,0.02)', padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                                        <p style={{ fontWeight: 700, color: '#818CF8', fontSize: 13.5 }}>Q: {b.question}</p>
                                        <p style={{ fontSize: 12.5, color: '#D1D5DB', marginTop: 6, lineHeight: 1.5 }}>{b.recommendedStarAnswer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
