const fs = require('fs');
const path = require('path');

function readJson(fileName) {
  const filePath = path.join(process.cwd(), 'public', 'data', fileName);
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Assessment-Token, Origin');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const defaultResults = readJson('assessment_results.json');
  const results = { ...defaultResults, meta: { ...defaultResults.meta, timestamp: new Date().toISOString() } };
  res.status(200).json({ status: 'SUCCESS', results });
};
