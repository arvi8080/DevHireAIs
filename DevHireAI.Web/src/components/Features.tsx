import React from 'react';
import { FeatureCard } from './FeatureCard';
import { 
  FileCheck2, 
  BookOpen, 
  Trophy, 
  Award, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

interface FeaturesProps {
  onSelectFeature?: (featureName: string) => void;
}

export const Features: React.FC<FeaturesProps> = ({ onSelectFeature }) => {
  return (
    <section id="features" className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Core AI Suite
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Succeed
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Powerful AI tools for developers accelerating their careers and hiring teams finding top technical talent.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* FEATURE 1: ATS Resume Optimizer */}
          <FeatureCard 
            title="ATS Resume Optimizer"
            badge="For Developers"
            accentColor="green"
            icon={FileCheck2}
            description="Analyze your resume against job descriptions, identify missing keywords, improve ATS match, and generate stronger resume bullets."
            bullets={[
              'ATS Keyword Gap Analysis',
              'ATS Match Score (0–100%)',
              'Optimized Resume Bullet Generator',
              'Personalized LinkedIn Cold Outreach Generator',
            ]}
            ctaText="Optimize Resume →"
            onCtaClick={() => onSelectFeature?.('ats')}
            mockupPreview={
              <div className="bg-slate-900 rounded-xl p-3.5 text-white text-xs font-mono border border-slate-800 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> ATS Match Score: 88%
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">PASSED</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  <span className="text-slate-500">Suggested Bullet:</span> "Architected microservices using C# & Docker, reducing API latency by 45%."
                </div>
              </div>
            }
          />

          {/* FEATURE 2: Interview Tomorrow? Copilot */}
          <FeatureCard 
            title="Interview Tomorrow? Copilot"
            badge="Interview Prep"
            accentColor="purple"
            icon={BookOpen}
            description="Get a personalized one-page preparation sheet for your upcoming technical interview in under 60 seconds."
            bullets={[
              '5 Core Technical Concepts to Review',
              'Likely System Design Topics',
              'STAR Behavioral Questions & Answers',
              'Company & Role Specific Preparation',
            ]}
            ctaText="Generate Prep Sheet →"
            onCtaClick={() => onSelectFeature?.('interview')}
            mockupPreview={
              <div className="bg-slate-900 rounded-xl p-3.5 text-white text-xs font-mono border border-slate-800 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-purple-400 font-bold">Target: Netflix (Senior .NET)</span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">1-PAGE CHEAT SHEET</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  <span className="text-slate-500">Core Topic:</span> Garbage Collection cycles, async streams, Redis Caching locks.
                </div>
              </div>
            }
          />

          {/* FEATURE 3: Batch Candidate Leaderboard */}
          <FeatureCard 
            title="Batch Candidate Leaderboard"
            badge="For Recruiters"
            accentColor="blue"
            icon={Trophy}
            description="Help recruiters compare and rank multiple candidates based on technical alignment and seniority."
            bullets={[
              'Multi-Resume Candidate Ranking',
              'Automated ATS Match Analysis',
              'Technical Skills Gap Analysis',
              'Seniority Detection & Hiring Recommendations',
            ]}
            ctaText="View Leaderboard →"
            onCtaClick={() => onSelectFeature?.('leaderboard')}
            mockupPreview={
              <div className="bg-slate-900 rounded-xl p-3.5 text-white text-xs font-mono border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-blue-400 font-bold">Rank #1: Alex R. (Senior .NET)</span>
                  <span className="text-emerald-400 font-bold">92% Match</span>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-400">Rank #2: Sarah C. (Full Stack)</span>
                  <span className="text-blue-400 font-bold">84% Match</span>
                </div>
              </div>
            }
          />

          {/* FEATURE 4: AI Technical Assessments */}
          <FeatureCard 
            title="AI Technical Assessments"
            badge="Assessment Engine"
            accentColor="orange"
            icon={Award}
            description="Generate role-specific technical assessments and automatically evaluate candidate responses with AI feedback."
            bullets={[
              'AI-Generated Technical Questions',
              'Role & Tech Stack Specific Quizzes',
              'Automated Answer Grading Engine',
              'Detailed Explanations & Analytics',
            ]}
            ctaText="Create Assessment →"
            onCtaClick={() => onSelectFeature?.('quiz')}
            mockupPreview={
              <div className="bg-slate-900 rounded-xl p-3.5 text-white text-xs font-mono border border-slate-800 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-orange-400 font-bold">Quiz Grade: 4/4 (100%)</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">EXCELLENT</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  <span className="text-slate-500">Feedback:</span> "Outstanding technical proficiency in C# & EF Core memory optimization."
                </div>
              </div>
            }
          />

        </div>

      </div>
    </section>
  );
};
