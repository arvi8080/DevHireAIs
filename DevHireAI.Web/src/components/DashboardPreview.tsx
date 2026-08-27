import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileCheck2, 
  BookOpen, 
  Award, 
  Users, 
  Bookmark, 
  Settings, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Bell, 
  ChevronRight
} from 'lucide-react';

export const DashboardPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="relative rounded-2xl border border-slate-200/80 bg-slate-900/5 p-2 sm:p-3 backdrop-blur-xl shadow-2xl shadow-blue-900/10 transition-all">
      
      {/* Decorative Glow */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Outer Window Chrome */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
        
        {/* Browser Address Bar Header */}
        <div className="bg-slate-100/90 border-b border-slate-200/80 px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400/90" />
            <div className="w-3 h-3 rounded-full bg-amber-400/90" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/90" />
          </div>

          {/* URL address pill */}
          <div className="flex-1 max-w-md bg-white border border-slate-200/80 rounded-lg px-3 py-1 text-xs text-slate-500 flex items-center gap-2 font-mono shadow-2xs">
            <span className="text-emerald-600 font-bold">https://</span>
            <span>app.devhireai.com/dashboard</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <Bell className="w-4 h-4" />
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
              AI
            </div>
          </div>
        </div>

        {/* Dashboard Shell Grid */}
        <div className="grid grid-cols-12 min-h-[460px] text-slate-800 bg-slate-50/50">
          
          {/* Mini Sidebar Menu */}
          <div className="col-span-3 border-r border-slate-200/70 bg-white p-3 hidden sm:flex flex-col justify-between">
            <div className="space-y-1">
              <div className="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Menu
              </div>

              {[
                { name: 'Overview', icon: LayoutDashboard },
                { name: 'Resume Optimizer', icon: FileCheck2 },
                { name: 'Interview Prep', icon: BookOpen },
                { name: 'Assessments', icon: Award },
                { name: 'Leaderboard', icon: Users },
                { name: 'Saved Jobs', icon: Bookmark },
                { name: 'Settings', icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors text-left ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-2xs' 
                        : 'text-slate-600 hover:bg-slate-100/80'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Sidebar Upgrade Callout */}
            <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 rounded-xl">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                AI Copilot Active
              </div>
              <p className="text-[11px] text-slate-600 leading-tight">
                98% ATS accuracy match enabled.
              </p>
            </div>
          </div>

          {/* Main Dashboard Content Area */}
          <div className="col-span-12 sm:col-span-9 p-4 sm:p-5 space-y-4">
            
            {/* Top Bar Greeting */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Senior .NET & Full-Stack Candidate Profile</h4>
                <p className="text-xs text-slate-500">Target Role: Senior Backend Engineer @ Stripe</p>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ATS Ready
              </span>
            </div>

            {/* Top 3 Metric Cards Grid */}
            <div className="grid grid-cols-3 gap-3">
              
              {/* Card 1: ATS Match Score */}
              <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs">
                <div className="text-[11px] font-semibold text-slate-500">ATS Match Score</div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">85%</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+12%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              {/* Card 2: Skills Matched */}
              <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs">
                <div className="text-[11px] font-semibold text-slate-500">Skills Matched</div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">23<span className="text-xs text-slate-400 font-normal">/28</span></span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">High Fit</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '82%' }} />
                </div>
              </div>

              {/* Card 3: Interview Readiness */}
              <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs">
                <div className="text-[11px] font-semibold text-slate-500">Interview Readiness</div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">72%</span>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Prepped</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '72%' }} />
                </div>
              </div>

            </div>

            {/* Middle Feature Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Box 1: Top Missing Keywords */}
              <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                    Top Missing Keywords
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['System Design', 'Microservices', 'Docker', 'Kubernetes'].map((kw) => (
                    <span key={kw} className="px-2 py-1 bg-amber-50 border border-amber-200/70 text-amber-800 rounded-md text-[11px] font-medium">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Box 2: Resume Optimization */}
              <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                    Resume Optimization
                  </span>
                </div>
                <ul className="text-[11px] text-slate-600 space-y-1 pt-1">
                  <li className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Impactful Bullet Points
                  </li>
                  <li className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Keyword Enhancement
                  </li>
                  <li className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> ATS Friendly Score
                  </li>
                </ul>
              </div>

              {/* Box 3: Interview Prep Copilot */}
              <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    Interview Prep Copilot
                  </span>
                </div>
                <ul className="text-[11px] text-slate-600 space-y-1 pt-1">
                  <li className="flex items-center justify-between">
                    <span>5 Core Concepts</span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1 rounded">Ready</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>System Design Topics</span>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1 rounded">3 Topics</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>STAR Questions</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">4 Formatted</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Bottom Recommendation Action Strip */}
            <div className="bg-slate-900 text-white rounded-xl p-3 flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-2.5 text-xs">
                <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">AI Action Item: Add Docker & Kubernetes</span>
                  <span className="text-[11px] text-slate-400">Estimated score boost: +12% ATS match</span>
                </div>
              </div>
              <button className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-1 shrink-0">
                Apply Fix
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
