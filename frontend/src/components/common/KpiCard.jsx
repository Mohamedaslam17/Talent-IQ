import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const KpiCard = ({ title, value, unit = "", subtext, icon: Icon, trend, trendValue, color = "cyan" }) => {
  const colorStyles = {
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20"
  };

  return (
    <div className="glass-panel p-4 sm:p-5 rounded-2xl relative overflow-hidden transition-all duration-200 hover:border-slate-700/80 flex flex-col justify-between space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 truncate">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-xl border shrink-0 ${colorStyles[color] || colorStyles.cyan}`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">{value}</span>
        {unit && <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">{unit}</span>}
      </div>

      <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/60 text-xs">
        {subtext && <span className="text-[11px] text-slate-400 truncate">{subtext}</span>}
        {trend && (
          <div className={`flex items-center text-[11px] font-semibold shrink-0 whitespace-nowrap ${
            trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-rose-400' : 'text-slate-400'
          }`}>
            {trend === 'up' && <TrendingUp className="w-3.5 h-3.5 mr-1" />}
            {trend === 'down' && <TrendingDown className="w-3.5 h-3.5 mr-1" />}
            {trend === 'neutral' && <Minus className="w-3.5 h-3.5 mr-1" />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};
