import React from 'react';

export const StatusBadge = ({ status }) => {
  const getLabel = (val) => {
    switch (val) {
      case 'Low Risk': return 'On Track';
      case 'Moderate Risk': return 'Needs Attention';
      case 'High Risk': return 'Needs Support';
      case 'Readiness High': return 'High Performance';
      default: return val;
    }
  };

  const getBadgeStyle = (val) => {
    switch (val) {
      case 'Active':
      case 'Low Risk':
      case 'On Track':
      case 'Completed':
      case 'Passed':
      case 'Graded':
      case 'Readiness High':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Moderate Risk':
      case 'Needs Attention':
      case 'In Progress':
      case 'Under Review':
      case 'Pending':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'High Risk':
      case 'Needs Support':
      case 'Inactive':
      case 'Failed':
      case 'Needs Mentoring':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <span className={`inline-flex items-center shrink-0 whitespace-nowrap px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getBadgeStyle(status)}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse shrink-0" />
      <span>{getLabel(status)}</span>
    </span>
  );
};
