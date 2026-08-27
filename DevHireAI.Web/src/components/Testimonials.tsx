import React from 'react';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "DevHireAI helped me identify exactly what was missing from my resume and prepare for my backend interview. I got the offer!",
      name: "Alex Rivera",
      role: "Backend Developer",
      company: "Landed role at Fintech Corp",
      avatarInitials: "AR",
      avatarBg: "bg-blue-600",
      rating: 5,
    },
    {
      quote: "The candidate leaderboard saved us hours of manual resume screening. We ranked 50+ candidates in under 3 minutes.",
      name: "Sarah Lin",
      role: "Engineering Manager",
      company: "TechCorp Global",
      avatarInitials: "SL",
      avatarBg: "bg-indigo-600",
      rating: 5,
    },
    {
      quote: "The interview prep copilot gave me a focused preparation plan instead of overwhelming me with random topics tonight.",
      name: "David Miller",
      role: "Full Stack Developer",
      company: "Landed role at SaaS Startup",
      avatarInitials: "DM",
      avatarBg: "bg-purple-600",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loved by Developers & Hiring Teams
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            See how DevHireAI accelerates technical careers and streamlines candidate evaluation.
          </p>
        </div>

        {/* 3 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${item.avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-2xs shrink-0`}>
                  {item.avatarInitials}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {item.role} • <span className="text-blue-600">{item.company}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
