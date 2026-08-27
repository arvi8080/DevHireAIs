import React from 'react';
import { Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info (2 Columns Wide on Desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                DevHire<span className="text-blue-500">AI</span>
              </span>
            </a>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              AI-powered tools for developers optimizing their careers and hiring teams evaluating technical talent faster.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              
              {/* LinkedIn Icon */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
                </svg>
              </a>

              {/* GitHub Icon */}
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>

              {/* Twitter / X Icon */}
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

            </div>
          </div>

          {/* Column 1: For Developers */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              For Developers
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Resume Optimizer</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Interview Prep</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Assessments</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Leaderboard</a></li>
            </ul>
          </div>

          {/* Column 2: For Recruiters */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              For Recruiters
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#for-recruiters" className="hover:text-white transition-colors">Candidate Ranking</a></li>
              <li><a href="#for-recruiters" className="hover:text-white transition-colors">AI Assessments</a></li>
              <li><a href="#for-recruiters" className="hover:text-white transition-colors">Candidate Insights</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#help" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#guides" className="hover:text-white transition-colors">Career Guides</a></li>
              <li><a href="/swagger" target="_blank" className="hover:text-white transition-colors">API Documentation</a></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 DevHireAI. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#security" className="hover:text-slate-400 transition-colors">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
