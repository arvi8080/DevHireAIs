import React, { useState, useEffect } from 'react';
import { quizService } from '../services/quizService';
import type { QuizQuestionDto, GradeQuizResponse } from '../types/quiz.types';
import { Code2, Sparkles, Send, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

export const ScreeningQuizView: React.FC = () => {
    const [jobTitle, setJobTitle] = useState('Senior Backend Developer (.NET Core)');
    const [skillsText, setSkillsText] = useState('C#, ASP.NET Core, EF Core, Redis, SQL Server, Docker');
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuizQuestionDto[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
    const [gradeResult, setGradeResult] = useState<GradeQuizResponse | null>(null);

    const fetchQuiz = async () => {
        setLoading(true);
        setGradeResult(null);
        setSelectedAnswers({});
        try {
            const skills = skillsText.split(',').map(s => s.trim());
            const data = await quizService.generateQuiz({ jobTitle, skills, jobDescription: '' });
            setQuestions(data.questions || []);
        } catch (err: any) {
            alert(err.message || 'Failed to generate quiz.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, []);

    const handleSelectOption = (questionId: number, optionIndex: number) => {
        setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    };

    const handleSubmitQuiz = async () => {
        const answers = Object.entries(selectedAnswers).map(([qId, optIdx]) => ({
            questionId: parseInt(qId),
            selectedOptionIndex: optIdx,
        }));

        try {
            const data = await quizService.gradeQuiz({ jobTitle, answers });
            setGradeResult(data);
        } catch (err: any) {
            alert(err.message || 'Failed to grade quiz.');
        }
    };

    return (
        <div className="tab-content active">
            <div className="hero-section">
                <div className="hero-badge"><Sparkles size={14} /> AI Assessment Engine</div>
                <h1 className="hero-title">Automated <span className="gradient-text">Tech Screening Quiz</span></h1>
                <p className="hero-subtitle">Generate real-time custom 4-question technical quizzes based on required job skills and automatically grade applicant responses.</p>
            </div>

            <div className="quiz-grid">
                <div className="glass-card">
                    <div className="card-title-row">
                        <Code2 size={20} className="gradient-text" />
                        <span>Screening Configuration</span>
                    </div>

                    <div className="form-group margin-top-md">
                        <label>Job Title</label>
                        <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Required Tech Stack (comma separated)</label>
                        <input type="text" value={skillsText} onChange={(e) => setSkillsText(e.target.value)} />
                    </div>
                    <button onClick={fetchQuiz} disabled={loading} className="primary-btn full-width margin-top-md">
                        <Sparkles size={18} /> {loading ? 'Generating Assessment...' : 'Generate AI Assessment Quiz'}
                    </button>
                </div>

                <div className="glass-card">
                    {gradeResult ? (
                        <div style={{ textAlign: 'center' }}>
                            <div className="gauge-container" style={{ margin: '0 auto 16px' }}>
                                <div className="gauge-text">{gradeResult.score}/{gradeResult.totalQuestions}</div>
                            </div>
                            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F9FAFB' }}>{gradeResult.percentage >= 75 ? 'Assessment Passed! 🎉' : 'Needs Review 💡'}</h2>
                            <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>{gradeResult.feedback}</p>

                            <div className="margin-top-lg" style={{ textAlign: 'left' }}>
                                {gradeResult.results.map((r, i) => (
                                    <div key={i} className="quiz-card-item" style={{ borderLeft: `4px solid ${r.isCorrect ? '#10B981' : '#EF4444'}` }}>
                                        <p style={{ fontWeight: 700, fontSize: 13.5, color: '#F9FAFB' }}>{r.questionText}</p>
                                        <p style={{ fontSize: 12, marginTop: 4, color: r.isCorrect ? '#10B981' : '#EF4444', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            {r.isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                                            {r.isCorrect ? 'Correct Selection' : 'Incorrect Selection'}
                                        </p>
                                        <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>{r.explanation}</p>
                                    </div>
                                ))}
                            </div>

                            <button onClick={fetchQuiz} className="primary-btn full-width margin-top-lg">
                                <RefreshCw size={16} /> Generate New Assessment
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F9FAFB' }}>{jobTitle} — Quiz</h3>
                                <span className="category-tag">4 Questions</span>
                            </div>

                            <div className="questions-container">
                                {questions.map((q, qIndex) => (
                                    <div key={q.id} className="quiz-card-item">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                                            <span className="category-tag">{q.category}</span>
                                            <span style={{ fontSize: 12, color: '#9CA3AF' }}>Q{qIndex + 1} of {questions.length}</span>
                                        </div>
                                        <p style={{ fontWeight: 600, fontSize: 14, color: '#F9FAFB', marginBottom: 12 }}>{q.questionText}</p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            {q.options.map((opt, optIndex) => (
                                                <label key={optIndex} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, background: selectedAnswers[q.id] === optIndex ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.02)', border: selectedAnswers[q.id] === optIndex ? '1px solid #6366F1' : '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontSize: 13 }}>
                                                    <input
                                                        type="radio"
                                                        name={`q_${q.id}`}
                                                        checked={selectedAnswers[q.id] === optIndex}
                                                        onChange={() => handleSelectOption(q.id, optIndex)}
                                                    />
                                                    <span>{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button onClick={handleSubmitQuiz} className="accent-btn full-width margin-top-lg">
                                <Send size={16} /> Submit & Grade Assessment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
