import React from 'react';
import { UserJourneyStep } from '../types';
import { ArrowRight, Sparkles, CheckCircle2, User, Cpu } from 'lucide-react';

interface JourneyTimelineProps {
  steps: UserJourneyStep[];
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ steps }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <span>🗺️ User Journey Blueprint</span>
            <span className="text-xs font-normal text-stone-500">
              (Input → Core Action → Value Outcome)
            </span>
          </h4>
          <p className="text-xs text-stone-500 mt-0.5">
            Step-by-step psychological progression from raw user intention to delighted value outcome
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        {steps.map((step, index) => {
          const isStep1 = index === 0;
          const isStep2 = index === 1;
          const isStep3 = index === 2;

          let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
          let borderColor = 'border-emerald-200';
          let accentBg = 'bg-emerald-50/60';

          if (isStep1) {
            badgeColor = 'bg-teal-100 text-teal-800 border-teal-200';
            borderColor = 'border-teal-200';
            accentBg = 'bg-teal-50/50';
          } else if (isStep2) {
            badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
            borderColor = 'border-emerald-200';
            accentBg = 'bg-emerald-50/60';
          } else if (isStep3) {
            badgeColor = 'bg-lime-100 text-lime-800 border-lime-200';
            borderColor = 'border-lime-200';
            accentBg = 'bg-lime-50/50';
          }

          return (
            <div
              key={step.step || index}
              className={`relative bg-white rounded-2xl p-5 border ${borderColor} shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group`}
            >
              {/* Top Phase Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${badgeColor}`}
                  >
                    {isStep1 && '🌱'} {isStep2 && '⚡'} {isStep3 && '🏆'}{' '}
                    {step.phase || `Step ${index + 1}`}
                  </span>
                  <span className="text-xs font-extrabold text-stone-400 group-hover:text-emerald-600 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                <h5 className="text-sm font-bold text-stone-900 mb-2 leading-snug">
                  {step.title}
                </h5>

                <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Interaction Details: User vs System */}
              <div className="space-y-2.5 pt-3 border-t border-stone-100">
                <div className={`p-2.5 rounded-xl ${accentBg} border border-emerald-100/60`}>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-700 mb-1">
                    <User className="w-3 h-3 text-emerald-600" />
                    <span>User Action:</span>
                  </div>
                  <p className="text-xs text-stone-700 font-medium">
                    {step.userAction}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-600 mb-1">
                    <Cpu className="w-3 h-3 text-teal-600" />
                    <span>System Reaction:</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    {step.systemReaction}
                  </p>
                </div>
              </div>

              {/* Arrow indicator between cards on desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-stone-300 items-center justify-center text-stone-400 shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
