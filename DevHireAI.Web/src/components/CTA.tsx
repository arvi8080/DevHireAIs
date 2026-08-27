import React from 'react';
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';

interface CTAProps {
  onGetStarted?: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onGetStarted }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-8 sm:p-12 lg:p-16 text-center text-white overflow-hidden shadow-2xl border border-slate-800">
          
          {/* Decorative Glow Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Get Started Today
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Ready to Hire Smarter or Get Hired Faster?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Use AI to optimize your career, prepare for technical interviews, or discover your next technical hire in minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button 
                onClick={onGetStarted}
                className="w-full sm:w-auto px-8 py-4 text-base font-extrabold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-lg transition-all hover:scale-105 inline-flex items-center justify-center gap-2 group"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a 
                href="#demo"
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white hover:text-blue-300 border border-slate-700 hover:border-slate-500 rounded-xl transition-all inline-flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book a Demo</span>
              </a>
            </div>

            <p className="text-xs text-slate-400 pt-2">
              Free plan includes full ATS optimization & screening quizzes. No credit card required.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
