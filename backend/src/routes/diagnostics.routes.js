const express = require('express');
const router = express.Router();
const dbEngine = require('../data/dbEngine');

// GET /api/diagnostics?mode=ai|static
router.get('/', async (req, res) => {
  const mode = req.query.mode || 'static';

  if (mode === 'static') {
    return res.json({
      success: true,
      mode: 'static',
      model: 'Cached Static Mode',
      timestamp: new Date().toLocaleTimeString(),
      data: dbEngine.getAiDiagnostic()
    });
  }

  // Live Gemini AI Mode
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.json({
      success: false,
      mode: 'error',
      model: 'Google Gemini 1.5 Flash',
      error: 'GEMINI_API_KEY environment variable is not configured in backend/.env',
      data: dbEngine.getAiDiagnostic()
    });
  }

  try {
    const stats = dbEngine.getDashboardStats();
    const bootcamps = dbEngine.getBootcamps();

    const promptText = `
You are an expert AI Learning & Development Director for Systech Solutions.
Analyze the following live student training metrics and return a JSON object ONLY (no markdown backticks, no markdown fence).

Current Class Metrics:
- Total Students: ${stats.kpis.total_trainees}
- Average Score: ${stats.kpis.avg_score}%
- Ready for Projects: ${stats.kpis.project_ready} students (${stats.kpis.readiness_percentage}%)
- Students Needing Support: ${stats.kpis.at_risk_count}
- Certified Students: ${stats.kpis.certified_count}
- Programs: ${bootcamps.map(b => b.name).join(', ')}

Return a JSON object matching this exact structure:
{
  "cohort_name": "GenAI & Cloud Architecture 2026",
  "overall_readiness_score": ${stats.kpis.avg_score},
  "readiness_status": "${stats.kpis.avg_score >= 85 ? 'High Readiness' : 'Moderate Readiness'}",
  "total_trainees": ${stats.kpis.total_trainees},
  "project_ready_count": ${stats.kpis.project_ready},
  "at_risk_count": ${stats.kpis.at_risk_count},
  "top_skill": "Azure OpenAI, LangChain & Microservices",
  "primary_gap": "Async Error Handling & Unit Testing",
  "executive_summary": "LIVE GEMINI AI ANALYSIS: <Write a 2-sentence fresh executive summary based on the metrics above>",
  "recommended_interventions": [
    { "title": "[AI Action] <Action 1>", "description": "<Description 1>", "priority": "High" },
    { "title": "[AI Action] <Action 2>", "description": "<Description 2>", "priority": "Medium" },
    { "title": "[AI Action] <Action 3>", "description": "<Description 3>", "priority": "High" }
  ]
}
`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }]
      })
    });

    if (!response.ok) {
      throw new Error(`Google Gemini API responded with HTTP status ${response.status}`);
    }

    const aiData = await response.json();
    const rawText = aiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Clean JSON response
    const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanJson);

    return res.json({
      success: true,
      mode: 'ai',
      model: 'Google Gemini 1.5 Flash',
      timestamp: new Date().toLocaleTimeString(),
      data: parsedData
    });

  } catch (err) {
    console.error('Gemini AI Generation Error:', err.message);
    return res.json({
      success: false,
      mode: 'error',
      model: 'Google Gemini 1.5 Flash',
      error: `Gemini API connection error: ${err.message}`,
      data: dbEngine.getAiDiagnostic()
    });
  }
});

module.exports = router;
