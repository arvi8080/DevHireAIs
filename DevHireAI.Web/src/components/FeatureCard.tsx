import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  badge: string;
  icon: LucideIcon;
  accentColor: 'green' | 'purple' | 'blue' | 'orange';
  bullets: string[];
  ctaText: string;
  onCtaClick?: () => void;
  mockupPreview?: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  badge,
  icon: Icon,
  accentColor,
  bullets,
  ctaText,
  onCtaClick,
  mockupPreview,
}) => {
  const accentStyles = {
    green: {
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      iconBg: 'bg-emerald-50 text-emerald-600',
      checkColor: 'text-emerald-500',
      btnHover: 'hover:text-emerald-600',
      borderHover: 'hover:border-emerald-200',
    },
    purple: {
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/80',
      iconBg: 'bg-purple-50 text-purple-600',
      checkColor: 'text-purple-500',
      btnHover: 'hover:text-purple-600',
      borderHover: 'hover:border-purple-200',
    },
    blue: {
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/80',
      iconBg: 'bg-blue-50 text-blue-600',
      checkColor: 'text-blue-500',
      btnHover: 'hover:text-blue-600',
      borderHover: 'hover:border-blue-200',
    },
    orange: {
      badgeBg: 'bg-orange-50 text-orange-700 border-orange-200/80',
      iconBg: 'bg-orange-50 text-orange-600',
      checkColor: 'text-orange-500',
      btnHover: 'hover:text-orange-600',
      borderHover: 'hover:border-orange-200',
    },
  }[accentColor];

  return (
    <div className={`bg-white border border-slate-200/80 ${accentStyles.borderHover} rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group`}>
      <div className="space-y-6">
        
        {/* Top Header Badge & Icon */}
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-2xl ${accentStyles.iconBg}`}>
            <Icon className="w-6 h-6" />
          </div>
          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${accentStyles.badgeBg}`}>
            {badge}
          </span>
        </div>

        {/* Feature Title & Description */}
        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Bullet List */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          {bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
              <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${accentStyles.checkColor}`} />
              <span>{bullet}</span>
            </div>
          ))}
        </div>

        {/* Optional Visual Mini Preview */}
        {mockupPreview && (
          <div className="pt-3">
            {mockupPreview}
          </div>
        )}

      </div>

      {/* Footer CTA Link */}
      <div className="pt-6 mt-6 border-t border-slate-100">
        <button 
          onClick={onCtaClick}
          className={`inline-flex items-center gap-2 text-sm font-bold text-slate-900 ${accentStyles.btnHover} transition-colors group/btn`}
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};
