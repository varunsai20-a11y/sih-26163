const defaultResults = require('../data/assessment_results.json');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Assessment-Token, Origin');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const results = { ...defaultResults, meta: { ...defaultResults.meta, timestamp: new Date().toISOString() } };
  res.status(200).json({ status: 'SUCCESS', results });
};
