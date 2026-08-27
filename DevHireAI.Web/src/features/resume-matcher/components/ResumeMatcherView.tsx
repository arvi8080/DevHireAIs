import React, { useState } from 'react';
import { resumeService } from '../services/resumeService';
import type { ResumeAnalysisResponse } from '../types/resume.types';
import { UploadCloud, FileText, Sparkles, CheckCircle2, XCircle, Award, Layers, HelpCircle } from 'lucide-react';

export const ResumeMatcherView: React.FC = () => {
    const [isPdfMode, setIsPdfMode] = useState(true);
    const [file, setFile] = useState<File | null>(null);
    const [resumeText, setResumeText] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ResumeAnalysisResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        if (!jobDesc) {
            alert('Please provide a Target Job Description.');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            let data: ResumeAnalysisResponse;
            if (isPdfMode) {
                if (!file) {
                    alert('Please select a PDF resume file.');
                    setLoading(false);
                    return;
                }
                data = await resumeService.uploadAndAnalyze(file, jobDesc);
            } else {
                if (!resumeText) {
                    alert('Please enter candidate resume text.');
                    setLoading(false);
                    return;
                }
                data = await resumeService.analyzeResume({
                    resumeText,
                    jobDescription: jobDesc,
                });
            }
            setResult(data);
        } catch (err: any) {
            setError(err.message || 'Resume analysis failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tab-content active">
            <div className="hero-section">
                <div className="hero-badge"><Sparkles size={14} /> AI Resume Engine</div>
                <h1 className="hero-title">Deep AI <span className="gradient-text">Resume Matcher</span></h1>
                <p className="hero-subtitle">Upload a PDF resume or paste text to perform deep skill matching, candidate seniority classification, and interview question generation.</p>
            </div>

            <div className="analyzer-grid">
                <div className="glass-card">
                    <div className="card-title-row">
                        <UploadCloud size={20} className="gradient-text" />
                        <span>Input Candidate Data</span>
                    </div>

                    <div className="flex bg-slate-900/60 p-1 rounded-xl mb-4 border border-slate-800">
                        <button
                            onClick={() => setIsPdfMode(true)}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                isPdfMode ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            PDF Upload
                        </button>
                        <button
                            onClick={() => setIsPdfMode(false)}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                !isPdfMode ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Raw Text
                        </button>
                    </div>

                    {isPdfMode ? (
                        <div className="border-2 border-dashed border-blue-500/30 rounded-xl bg-blue-500/5 p-6 text-center relative cursor-pointer hover:border-blue-500 transition-colors">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto mb-3">
                                <UploadCloud size={24} />
                            </div>
                            <p className="text-xs font-bold text-slate-200">
                                {file ? file.name : 'Drag & Drop Candidate PDF Resume'}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-1">Supports .pdf formats</p>
                        </div>
                    ) : (
                        <div className="form-group">
                            <label><FileText size={15} /> Resume Text</label>
                            <textarea
                                value={resumeText}
                                onChange={(e) => setResumeText(e.target.value)}
                                placeholder="Paste resume text..."
                                rows={6}
                            />
                        </div>
                    )}

                    <div className="form-group margin-top-md">
                        <label>Target Job Description</label>
                        <textarea
                            value={jobDesc}
                            onChange={(e) => setJobDesc(e.target.value)}
                            placeholder="Paste job requirements..."
                            rows={4}
                        />
                    </div>

                    {error && <p style={{ color: '#EF4444', marginBottom: 12, fontSize: 12 }}>{error}</p>}

                    <button onClick={handleAnalyze} disabled={loading} className="primary-btn full-width">
                        <Sparkles size={17} /> {loading ? 'Analyzing...' : 'Run Match Analysis'}
                    </button>
                </div>

                <div className="glass-card">
                    {!result ? (
                        <div className="empty-state">
                            <div className="empty-icon"><FileText size={38} /></div>
                            <h3 style={{ color: '#E5E7EB', marginBottom: 6 }}>AI Insights Pending</h3>
                            <p>Provide a resume and job description to get match percentage and skill breakdown.</p>
                        </div>
                    ) : (
                        <div className="analysis-results">
                            <div className="score-banner">
                                <div className="gauge-container">
                                    <div className="gauge-text">{result.matchPercentage}%</div>
                                </div>
                                <div>
                                    <span className="seniority-badge"><Award size={13} /> {result.candidateSeniority}</span>
                                    <h3 style={{ fontSize: 16, color: '#F9FAFB', marginTop: 6 }}>{result.suggestion}</h3>
                                </div>
                            </div>

                            <div className="margin-top-md">
                                <h4><CheckCircle2 size={17} style={{ color: '#10B981' }} /> Matching Skills</h4>
                                <div className="tags-flex margin-top-md">
                                    {result.matchingSkills.map((s, i) => <span key={i} className="tag" style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}>{s}</span>)}
                                </div>
                            </div>

                            <div className="margin-top-md">
                                <h4><XCircle size={17} style={{ color: '#EF4444' }} /> Missing Skills</h4>
                                <div className="tags-flex margin-top-md">
                                    {result.missingSkills.map((s, i) => <span key={i} className="tag tag-danger">{s}</span>)}
                                </div>
                            </div>

                            <div className="margin-top-md">
                                <h4><Layers size={17} style={{ color: '#06B6D4' }} /> Candidate Key Projects</h4>
                                <ul className="custom-list margin-top-md">
                                    {result.keyProjects.map((p, i) => <li key={i}>{p}</li>)}
                                </ul>
                            </div>

                            <div className="margin-top-md">
                                <h4><HelpCircle size={17} style={{ color: '#818CF8' }} /> Recommended Technical Interview Questions</h4>
                                <div className="questions-list margin-top-md">
                                    {result.interviewQuestions.map((q, i) => <div key={i} className="question-item">{q}</div>)}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
