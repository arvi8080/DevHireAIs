import React from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface RecruiterSectionProps {
  onGetStarted?: () => void;
}

export const RecruiterSection: React.FC<RecruiterSectionProps> = ({ onGetStarted }) => {
  const recruiterFeatures = [
    { title: 'Batch Candidate Ranking', desc: 'Rank multiple PDF resumes simultaneously against a target job description.' },
    { title: 'Skill Matching', desc: 'Instant breakdown of required vs missing candidate tech stack.' },
    { title: 'Seniority Detection', desc: 'Automated classification into Junior, Mid, Senior, or Staff Architect tiers.' },
    { title: 'AI Technical Assessments', desc: 'Role-specific coding quizzes with automated AI grading and feedback.' },
    { title: 'Automated Candidate Insights', desc: 'Get tailored technical interview questions to ask each candidate.' },
  ];

  return (
    <section id="for-recruiters" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Ambient Radial Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider">
            For Hiring Managers & Recruiters
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Find Better Technical Talent, Faster
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Automate manual resume screening and evaluate technical skills in minutes instead of days.
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Candidate Leaderboard Preview */}
          <div className="lg:col-span-6">
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl backdrop-blur-xl">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/70">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Senior .NET Candidate Pipeline</h4>
                    <p className="text-[10px] text-slate-400">3 Candidates Evaluated</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                  Batch Ranked
                </span>
              </div>

              {/* Leaderboard Candidate Row 1 */}
              <div className="bg-slate-900/90 border-l-4 border-emerald-500 border-y border-r border-slate-700/60 rounded-r-xl p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">#1 RANK</span>
                    <span className="text-xs font-bold text-white">Alex Rivera</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">Senior Engineer</span>
                  </div>
                  <span className="text-sm font-black text-emerald-400">92% Match</span>
                </div>
                <p className="text-[11px] text-slate-400">Skills: C#, ASP.NET Core, EF Core, SQL Server, Docker, Microservices</p>
              </div>

              {/* Leaderboard Candidate Row 2 */}
              <div className="bg-slate-900/90 border-l-4 border-blue-500 border-y border-r border-slate-700/60 rounded-r-xl p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-blue-400 bg-blue-500/20 px-1.5 py-0.5 rounded">#2 RANK</span>
                    <span className="text-xs font-bold text-white">Sarah Chen</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">Mid-Level</span>
                  </div>
                  <span className="text-sm font-black text-blue-400">84% Match</span>
                </div>
                <p className="text-[11px] text-slate-400">Skills: React, TypeScript, C#, REST APIs, SQL Server</p>
              </div>

              {/* Leaderboard Candidate Row 3 */}
              <div className="bg-slate-900/90 border-l-4 border-amber-500 border-y border-r border-slate-700/60 rounded-r-xl p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded">#3 RANK</span>
                    <span className="text-xs font-bold text-white">David Miller</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">Junior</span>
                  </div>
                  <span className="text-sm font-black text-amber-400">65% Match</span>
                </div>
                <p className="text-[11px] text-slate-400">Skills: C#, HTML, CSS, JavaScript, SQL basics</p>
              </div>

            </div>
          </div>

          {/* Right Column: Features Checklist */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              {recruiterFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/50">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{feat.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button 
                onClick={onGetStarted}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/20 transition-all inline-flex items-center gap-2"
              >
                <span>Start Hiring Smarter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
