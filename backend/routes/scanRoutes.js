// const express = require('express');
// const router = express.Router();
// const { exec } = require('child_process');
// const path = require('path');
// const fs = require('fs');

// const reportFolderPath = path.join(__dirname, '..', 'zap_reports');
// if (!fs.existsSync(reportFolderPath)) {
//   fs.mkdirSync(reportFolderPath);
// }

// // Function to parse ZAP report file
// const parseZapReport = (filePath) => {
//   const content = fs.readFileSync(filePath, 'utf-8');
//   const lines = content.split('\n');
//   const vulnerabilities = [];

//   let currentIssue = null;
//   lines.forEach(line => {
//     if (line.includes('Alert')) {
//       if (currentIssue) vulnerabilities.push(currentIssue);
//       currentIssue = { type: '', severity: '', description: '' };
//     }
//     if (line.startsWith('Risk:')) {
//       const severity = line.split('Risk:')[1].trim();
//       currentIssue.severity = severity.toLowerCase().includes('high') ? 'high' : 'low';
//     }
//     if (line.startsWith('Alert:')) {
//       currentIssue.type = line.split('Alert:')[1].trim();
//     }
//   });

//   if (currentIssue && currentIssue.type) vulnerabilities.push(currentIssue);
//   return vulnerabilities;
// };

// router.post('/scan', async (req, res) => {
//   const { url, scanType } = req.body;

//   if (!url || !scanType) {
//     return res.status(400).json({ error: 'URL and scan type are required.' });
//   }

//   const timestamp = Date.now();
//   const fileName = `zap_report_${timestamp}.txt`;
//   const reportPath = path.join(reportFolderPath, fileName);

//   const zapBatPath = `"C:\\Program Files\\ZAP\\Zed Attack Proxy\\zap.bat"`;
//   const command = `${zapBatPath} -cmd -quickurl ${url} -quickout "${reportPath}"`;

//   exec(command, { cwd: 'C:\\Program Files\\ZAP\\Zed Attack Proxy' }, (error, stdout, stderr) => {
//     if (error) {
//       console.error('ZAP error:', error.message);
//       return res.status(500).json({
//         error: 'Scan failed. Please check your backend or URL.',
//         reportUrl: `zap_reports/${fileName}` // still allow downloading partial result
//       });
//     }

//     let parsedVulnerabilities = [];
//     let rawText='';
//     try {
//       const rawText=fs.readFileSync(reportPath,'utf-8');
//       parsedVulnerabilities = parseZapReport(reportPath);
//     } catch (e) {
//       console.error('Error parsing report:', e);
//     }
//     console.log("Parsed vulnerabilities",parsedVulnerabilities);
//     res.json({
//       vulnerabilities: parsedVulnerabilities,
//       reportText: rawText,
//       reportDownloadPath: `/api/reports/${fileName}`
//     });
//   });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { runZAPScan } = require("../utils/scanner"); // adjust path if needed

// POST /api/scan - Runs ZAP scan
router.post("/scan", async (req, res) => {
  const { url, scanType } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required." });

  try {
    const { pdfReport, vulnerabilities } = await runZAPScan(url, scanType);
    const fileName = path.basename(pdfReport);

    res.json({
      success: true,
      message: "Scan completed",
      vulnerabilities,
      reportPath: `/api/scan/reports/${fileName}`, // <-- Frontend will use this to download
      scanType: scanType || "Quick",
    });
  } catch (err) {
    console.error("Scan error:", err);
    res.status(500).json({
      error: "Scan failed",
      details: typeof err === "string" ? err : err?.message || "Unknown error",
    });
  }
});

// GET /api/scan/reports/:filename - Serves the PDF
router.get("/reports/:filename", (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "../reports", fileName); // Make sure this matches where the file is saved

  if (fs.existsSync(filePath)) {
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).send("Error downloading file.");
      }
    });
  } else {
    res.status(404).send("Report not found.");
  }
});

module.exports = router;
