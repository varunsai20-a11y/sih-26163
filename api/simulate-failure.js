const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Assessment-Token, Origin');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const filePath = path.join(process.cwd(), 'public', 'data', 'assessment_results.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const defaultResults = JSON.parse(raw);

  const results = {
    ...defaultResults,
    meta: {
      ...defaultResults.meta,
      engineStatus: 'FALLBACK',
      fallbackReason: 'Simulated primary engine failure',
      timestamp: new Date().toISOString(),
    },
    posture: {
      ...defaultResults.posture,
      postureScore: 49.8,
      status: 'DEGRADED',
      riskLevel: 'HIGH'
    }
  };

  res.status(200).json({ status: 'SUCCESS', results });
};
