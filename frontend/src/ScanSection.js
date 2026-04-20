
import React, { useState } from 'react';
import axios from 'axios';
import { useIdToken } from './auth/useIdToken';

export default function ScanSection({ id }) {
  const [url, setUrl] = useState('');
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [scanType, setScanType]=useState('Quick');
  const [loading, setLoading] = useState(false);
  const [reportText, setReportText] = useState('');
  const [reportDownloadPath, setReportDownloadPath] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const getIdToken = useIdToken();

  const handleScan = async () => {
    if (!url) {
      setError('Please enter a valid website URL.');
      return;
    }

    setLoading(true);
    setError('');
    setReportText('');
    setReportDownloadPath('');
    setVulnerabilities([]);
    setSuccess('');

    try {
      const token = await getIdToken();
      const response = await axios.post(
        'http://localhost:5000/api/scan',
        {
          url,
          scanType,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      const { vulnerabilities, reportPath } = response.data;

      setVulnerabilities(vulnerabilities || []);
      setReportText(JSON.stringify(vulnerabilities, null, 2)); // or any formatted string
      setReportDownloadPath(reportPath || '');
      setSuccess('Scan completed successfully. You can download the report below.');
    } catch (err) {
      console.error(err);
      setError('Scan failed. Please check your backend or URL.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (!reportDownloadPath) return;

    const link = document.createElement('a');
    link.href = `http://localhost:5000${reportDownloadPath}`;
    link.setAttribute('download', 'scan_report.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="scan-section" id={id}>
      <div className="scan-box">
        <h2>Enter Your Website</h2>
        <input
          type="text"
          placeholder="https://example.com"
          className="scan-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="scan-controls">
          <select
            className="scan-type"
            value={scanType}
            onChange={(e) => setScanType(e.target.value)}
          >
            <option>Quick</option>
            <option>Deep</option>
          </select>
          <button id="start-scan" onClick={handleScan}>
            START SCAN
          </button>
        </div>
      </div>

      {loading && (
        <div className="scan-status">
          <div className="scan-loader"></div>
          <div className="scan-text">
            <p>Initiating Scan...</p>
            <p>Checking SQL Injection...</p>
            <p>Finalizing Report...</p>
          </div>
        </div>
      )}

      {error && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
          {error}
        </p>
      )}

      {success && !loading && !error && (
        <p style={{ color: '#1dd78c', textAlign: 'center', marginTop: '10px' }}>
          {success}
        </p>
      )}

      
        <div className="scan-results">
          

          <div className="pdf-download">
            <button className="pdf-btn" onClick={handleDownloadReport} disabled={!reportDownloadPath || loading}>
              DOWNLOAD REPORT
            </button>
          </div>
        </div>
      
    </section>
  );
}
