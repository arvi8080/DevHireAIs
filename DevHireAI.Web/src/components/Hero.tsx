import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Users 
} from 'lucide-react';
import { DashboardPreview } from './DashboardPreview';

interface HeroProps {
  onGetStarted?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section id="home" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-white">
      
      {/* Background Soft Glow Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/60 via-indigo-50/30 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Hero Copy & Calls-To-Action */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Small Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>AI-Powered Hiring & Career Acceleration Platform</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Hire Smarter.<br />
              Prepare Better.<br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Get Ahead.
              </span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              DevHireAI helps developers optimize resumes, prepare for technical interviews, and land dream jobs — while helping recruiters find and evaluate top technical talent faster with AI.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button 
                onClick={onGetStarted}
                className="px-6 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md shadow-blue-600/25 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a 
                href="#features"
                className="px-6 py-3.5 text-base font-semibold text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl shadow-2xs transition-all text-center"
              >
                Explore Features
              </a>
            </div>

            {/* 3 Trust Indicators Below Buttons */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span>AI-Powered</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Secure & Reliable</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <span>Built for Developers & Recruiters</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Realistic Dashboard Preview Mockup */}
          <div className="lg:col-span-6">
            <DashboardPreview />
          </div>

        </div>
      </div>
    </section>
  );
};
