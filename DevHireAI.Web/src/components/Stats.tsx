import React from 'react';
import { Users, Building2, FileCheck2, TrendingUp } from 'lucide-react';

export const Stats: React.FC = () => {
  const statsData = [
    {
      value: '10,000+',
      label: 'Developers Accelerated',
      description: 'Active software engineers',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      value: '500+',
      label: 'Hiring Teams',
      description: 'Empowered engineering managers',
      icon: Building2,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      value: '50,000+',
      label: 'Resumes Optimized',
      description: 'ATS match verified',
      icon: FileCheck2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      value: '95%',
      label: 'Interview Success Rate',
      description: 'First-round tech pass rate',
      icon: TrendingUp,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <section className="py-10 bg-slate-50/70 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-slate-200/70 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color} shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
