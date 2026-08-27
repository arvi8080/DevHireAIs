import React from 'react';
import { Upload, Cpu, LineChart, Trophy } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Upload / Add Details',
      description: 'Upload your PDF resume or paste the job posting link & requirements.',
      icon: Upload,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      number: '02',
      title: 'AI Analysis',
      description: 'DevHireAI performs deep semantic parsing & ATS keyword matching.',
      icon: Cpu,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
    {
      number: '03',
      title: 'Get Insights',
      description: 'Receive your ATS match score, missing skills, and custom interview prep sheet.',
      icon: LineChart,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
    {
      number: '04',
      title: 'Apply & Succeed',
      description: 'Send high-converting applications, ace your technical interviews, or hire top talent.',
      icon: Trophy,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            From Resume to Opportunity
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Four simple steps to accelerate your career or optimize your hiring workflow.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="relative bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div>
                  {/* Step Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${step.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-300">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Title & Description */}
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-blue-600">
                  <span>Step {idx + 1}</span>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
