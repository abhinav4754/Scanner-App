const { exec } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const PDFDocument = require("pdfkit");

// Parse alerts directly from the ZAP XML report
function parseAlertsFromXML(xmlContent) {
  const alerts = [];
  const regex = /<alertitem>[\s\S]*?<\/alertitem>/g;
  const items = xmlContent.match(regex);

  if (items) {
    items.forEach((item) => {
      const getTag = (tag) => {
        const match = item.match(new RegExp(`<${tag}>(.*?)</${tag}>`, "s"));
        return match ? match[1].trim() : "";
      };

      alerts.push({
        alert: getTag("alert"),
        risk: getTag("riskdesc"),
        description: getTag("desc"),
        solution: getTag("solution"),
      });
    });
  }

  return alerts;
}

// Generate PDF report from alerts
function generatePDF(alerts, pdfPath) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(pdfPath));

  doc.fontSize(20).text("OWASP ZAP Vulnerability Report", { align: "center" });
  doc.moveDown();

  if (alerts.length > 0) {
    alerts.forEach((alert, idx) => {
      doc
        .fontSize(14)
        .text(`${idx + 1}. ${alert.alert}`, { underline: true });

      doc
        .fontSize(12)
        .text(`Risk: ${alert.risk}`)
        .text(`Description: ${alert.description || "N/A"}`)
        .text(`Solution: ${alert.solution || "N/A"}`)
        .moveDown();
    });
  } else {
    doc.fontSize(12).text("No vulnerabilities were found.");
  }

  doc.fontSize(10).text(`Report generated on: ${new Date().toLocaleString()}`, {
    align: "right",
  });
  doc.end();
}

// Run ZAP scan using command-line and process result
function runZAPScan(url, scanType = "Quick") {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    const reportsDir = path.resolve(__dirname, "../reports");
    const zapHomeDir = path.resolve(__dirname, "../zap_home", `${timestamp}`);
    const reportPath = path.join(reportsDir, `zap-${timestamp}.xml`);
    const pdfPath = path.join(reportsDir, `zap-${timestamp}.pdf`);

    fs.mkdirSync(reportsDir, { recursive: true });
    fs.mkdirSync(zapHomeDir, { recursive: true });

    const isWindows = os.platform() === "win32";
    const zapCommand = isWindows ? `"C:\\Program Files\\ZAP\\Zed Attack Proxy\\zap.bat"` : "./zap.sh";

    const mode = (scanType || "Quick").toLowerCase();
    const isDeep = mode === "deep";

    const args = [
      `${zapCommand}`,
      `-dir "${zapHomeDir}"`,
      "-cmd",
      `-quickurl ${url}`,
      `-quickout "${reportPath}"`,
      "-quickprogress",
    ];

    if (isDeep) {
      // Slightly broader crawl, still conservative to avoid past OOM/doctype issues
      args.push(
        "-config spider.maxDepth=4",
        "-config spider.maxChildren=60",
        "-config spider.maxDuration=5",
        "-config spider.threadCount=4",
        "-config spider.postForm=false"
      );
    }

    const command = args.join(" ");

    console.log("Starting ZAP scan...");
    console.log("Command:", command);

    const defaultTimeout = process.env.ZAP_TIMEOUT_MS
      ? Number(process.env.ZAP_TIMEOUT_MS)
      : isDeep
        ? 300000
        : 180000;

    exec(command, {
      cwd: isWindows ? "C:\\Program Files\\ZAP\\Zed Attack Proxy" : undefined,
      timeout: defaultTimeout,
      env: { ...process.env, ZAP_HOME: zapHomeDir },
    }, (error, stdout, stderr) => {
      if (stdout) console.log("ZAP stdout:", stdout);
      if (stderr) console.error("ZAP stderr:", stderr);

      if (error) {
        console.error("ZAP exec error:", {
          message: error.message,
          code: error.code,
          signal: error.signal,
          killed: error.killed,
        });
      }

      const reportExists = fs.existsSync(reportPath);
      if (error && !reportExists) {
        const zapLogPath = path.join(zapHomeDir, "zap.log");
        let zapLogTail = "";
        if (fs.existsSync(zapLogPath)) {
          try {
            const content = fs.readFileSync(zapLogPath, "utf8");
            zapLogTail = content.slice(-2000); // last part for debugging
          } catch (_) {}
        }

        return reject(
          `ZAP scan failed: ${stderr || error.message || "unknown"}` +
            (error.code ? ` (code: ${error.code})` : "") +
            (error.signal ? ` (signal: ${error.signal})` : "") +
            (zapLogTail ? ` | zap.log tail: ${zapLogTail}` : "")
        );
      }

      if (!reportExists) {
        return reject("ZAP report not found at " + reportPath);
      }

      fs.readFile(reportPath, "utf8", (err, data) => {
        if (err) return reject("Failed to read ZAP report XML: " + err.message);

        const alerts = parseAlertsFromXML(data);
        generatePDF(alerts, pdfPath);

        resolve({
          tool: "OWASP ZAP",
          pdfReport: pdfPath,
          rawResults: alerts,
          vulnerabilities: alerts,
        });
      });
    });
  });
}

module.exports = { runZAPScan };