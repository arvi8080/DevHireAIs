import React from 'react';
import { 
  FileCheck2, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Code2, 
  AlertTriangle 
} from 'lucide-react';

interface DeveloperSectionProps {
  onGetStarted?: () => void;
}

export const DeveloperSection: React.FC<DeveloperSectionProps> = ({ onGetStarted }) => {
  const cards = [
    {
      title: 'Optimize Your Resume',
      description: 'Align your resume against job postings to pass ATS keyword filters with high accuracy.',
      icon: FileCheck2,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: 'Prepare for Interviews',
      description: 'Generate 1-page company cheat sheets with core concepts & STAR behavioral answers.',
      icon: BookOpen,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      title: 'Discover Skill Gaps',
      description: 'Identify exact missing tech stack keywords before submitting your application.',
      icon: AlertTriangle,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'Improve Technical Readiness',
      description: 'Practice 4-question technical quizzes tailored to target roles and track progress.',
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-50',
    },
  ];

  return (
    <section id="for-developers" className="py-20 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
            For Software Engineers & Job Seekers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Build Your Career With AI
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Everything you need to stand out to employers and pass technical interviews with confidence.
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Cards List */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {cards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all space-y-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <button 
                onClick={onGetStarted}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-600/25 transition-all inline-flex items-center gap-2"
              >
                <span>Start Preparing Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Visual Resume Analysis Card Mockup */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 rounded-2xl p-5 sm:p-6 text-white shadow-2xl border border-slate-800 space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">ATS Analysis Report</h4>
                    <p className="text-[10px] text-slate-400">Senior Full-Stack Engineer Profile</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold rounded-full">
                  88% Match
                </span>
              </div>

              {/* Keyword Badges */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Matched Core Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['C#', '.NET Core', 'SQL Server', 'REST APIs', 'EF Core', 'Git'].map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[11px] font-medium">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actionable Suggestions */}
              <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/70 space-y-1.5 text-xs">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Suggested Resume Enhancement
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  "Architected high-performance ASP.NET Core web APIs with Entity Framework Core, handling 10k+ daily transactions with 99.9% uptime."
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
