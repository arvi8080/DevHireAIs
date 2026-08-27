import React, { useState } from 'react';
import { atsService } from '../services/atsService';
import type { AtsOptimizationResponse } from '../types/ats.types';
import { ShieldCheck, Sparkles, Building, FileText, Briefcase, AlertTriangle, CheckSquare, MessageSquare, Copy, Check } from 'lucide-react';

export const AtsOptimizerView: React.FC = () => {
    const [company, setCompany] = useState('');
    const [resumeText, setResumeText] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [result, setResult] = useState<AtsOptimizationResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleOptimize = async () => {
        if (!resumeText || !jobDesc) {
            alert('Please enter both your Resume Text and Target Job Description.');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await atsService.optimizeForAts({
                targetCompany: company,
                resumeText,
                jobDescription: jobDesc,
            });
            setResult(data);
        } catch (err: any) {
            setError(err.message || 'ATS Optimization failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopyMsg = () => {
        if (result?.personalizedLinkedInMessage) {
            navigator.clipboard.writeText(result.personalizedLinkedInMessage);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="tab-content active">
            <div className="hero-section">
                <div className="hero-badge"><Sparkles size={14} /> AI Candidate Optimizer</div>
                <h1 className="hero-title">Beat ATS Filters & <span className="gradient-text">Land Interviews</span></h1>
                <p className="hero-subtitle">Optimize your resume keywords against ATS algorithms, generate tailored achievements, and copy-paste personalized LinkedIn outreach messages to hiring teams.</p>
            </div>

            <div className="analyzer-grid">
                <div className="glass-card">
                    <div className="card-title-row">
                        <FileText size={20} className="gradient-text" />
                        <span>Job & Resume Inputs</span>
                    </div>

                    <div className="form-group margin-top-md">
                        <label><Building size={15} /> Target Company Name</label>
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="e.g. Microsoft, Stripe, Google, Acme Corp"
                        />
                    </div>
                    <div className="form-group">
                        <label><FileText size={15} /> Your Resume Content</label>
                        <textarea
                            value={resumeText}
                            onChange={(e) => setResumeText(e.target.value)}
                            placeholder="Paste your resume text here..."
                            rows={7}
                        />
                    </div>
                    <div className="form-group">
                        <label><Briefcase size={15} /> Job Posting Description</label>
                        <textarea
                            value={jobDesc}
                            onChange={(e) => setJobDesc(e.target.value)}
                            placeholder="Paste target job requirements..."
                            rows={5}
                        />
                    </div>
                    {error && <p style={{ color: '#EF4444', marginBottom: 14, fontSize: 13 }}>{error}</p>}
                    <button onClick={handleOptimize} disabled={loading} className="primary-btn full-width">
                        <Sparkles size={18} /> {loading ? 'Analyzing & Optimizing...' : 'Run Real-World ATS Optimizer'}
                    </button>
                </div>

                <div className="glass-card">
                    {!result ? (
                        <div className="empty-state">
                            <div className="empty-icon"><ShieldCheck size={38} /></div>
                            <h3 style={{ color: '#E5E7EB', marginBottom: 6 }}>ATS Evaluation Pending</h3>
                            <p>Provide your resume and job requirements to generate real-time ATS match scores, missing keywords, and recruiter outreach templates.</p>
                        </div>
                    ) : (
                        <div className="analysis-results">
                            <div className="score-banner">
                                <div className="gauge-container">
                                    <div className="gauge-text">{result.atsScore}%</div>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 18, color: '#F9FAFB' }}>ATS Match Score</h3>
                                    <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 2 }}>Keyword alignment against automated applicant filters</p>
                                </div>
                            </div>

                            <div className="margin-top-md">
                                <h4><AlertTriangle size={17} style={{ color: '#F59E0B' }} /> Critical Missing Keywords</h4>
                                <div className="tags-flex margin-top-md">
                                    {result.criticalMissingKeywords.map((k, i) => (
                                        <span key={i} className="tag tag-danger">{k}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="margin-top-md">
                                <h4><CheckSquare size={17} style={{ color: '#06B6D4' }} /> Optimized Resume Bullet Points</h4>
                                <ul className="custom-list margin-top-md">
                                    {result.optimizedBulletPoints.map((b, i) => (
                                        <li key={i}>{b}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="margin-top-md">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                    <h4 style={{ margin: 0 }}><MessageSquare size={17} style={{ color: '#10B981' }} /> LinkedIn Recruiter Message</h4>
                                    <button onClick={handleCopyMsg} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#9CA3AF', padding: '4px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                                        {copied ? <Check size={14} style={{ color: '#10B981' }} /> : <Copy size={14} />}
                                        {copied ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                                <div className="question-item">
                                    {result.personalizedLinkedInMessage}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
