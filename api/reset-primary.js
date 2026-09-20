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

  const outputDir = path.join(__dirname, '..', 'output');
  const files = ['assessment_results.json', 'comparisons.json', 'history.json'];

  for (const file of files) {
    const full = path.join(outputDir, file);
    if (fs.existsSync(full)) {
      fs.unlinkSync(full);
    }
  }

  res.status(200).json({ status: 'SUCCESS', message: 'Primary engine reset and output snapshots cleared.' });
};
