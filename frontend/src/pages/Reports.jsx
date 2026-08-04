import React, { useState } from 'react';
import { api } from '../services/api';
import { FileSpreadsheet, Download, FileText, Printer, CheckCircle, Table, FileJson } from 'lucide-react';

export const Reports = () => {
  const [downloading, setDownloading] = useState(false);

  const handleExportCSV = async () => {
    setDownloading(true);
    const trainees = await api.getTrainees();
    
    // Convert trainees to CSV format
    const headers = ["Trainee ID", "Name", "Email", "Employee ID", "Bootcamp Track", "College", "Readiness Score (%)", "Attendance Rate (%)", "Risk Level"];
    const rows = trainees.map(t => [
      t.trainee_id,
      `"${t.name}"`,
      t.email,
      t.employee_id,
      `"${t.bootcamp_name}"`,
      `"${t.college}"`,
      t.score,
      t.attendance_rate,
      t.risk_level
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Systech_TalentIQ_Readiness_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloading(false);
  };

  const handleExportJSON = async () => {
    setDownloading(true);
    const trainees = await api.getTrainees();
    const stats = await api.getDashboardStats();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ generated_at: new Date().toISOString(), stats, trainees }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `TalentIQ_Full_Export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setDownloading(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-6 rounded-2xl flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2.5">
            <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
            <span>Reports & Export Center</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate branded executive PDF reports, export trainee performance datasets in CSV or JSON format for enterprise L&D audits.
          </p>
        </div>
      </div>

      {/* Export Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CSV Export */}
        <div className="glass-card p-6 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="p-3 w-fit rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Table className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Trainee Directory Export (CSV)</h3>
            <p className="text-xs text-slate-300">
              Complete spreadsheet extract of all registered trainees, individual readiness scores, risk levels, and college degrees.
            </p>
          </div>
          <button 
            onClick={handleExportCSV}
            disabled={downloading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Generating CSV...' : 'Download CSV Dataset'}</span>
          </button>
        </div>

        {/* JSON Export */}
        <div className="glass-card p-6 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="p-3 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileJson className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Full Analytics Backup (JSON)</h3>
            <p className="text-xs text-slate-300">
              Raw structured JSON dump of dashboard KPIs, risk distribution, cohort performance metrics, and activity logs.
            </p>
          </div>
          <button 
            onClick={handleExportJSON}
            disabled={downloading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Exporting...' : 'Export Structured JSON'}</span>
          </button>
        </div>

        {/* Executive Print PDF */}
        <div className="glass-card p-6 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="p-3 w-fit rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Executive Print Report</h3>
            <p className="text-xs text-slate-300">
              Format current workspace view for high-resolution PDF printing and board presentation.
            </p>
          </div>
          <button 
            onClick={() => window.print()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Executive PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
