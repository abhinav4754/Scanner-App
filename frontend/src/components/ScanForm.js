// // src/components/ScanForm.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import Loader from './Loader';

// const ScanForm = () => {
//   const [url, setUrl] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setResults(null);

//     try {
//       const response = await axios.post('http://localhost:5000/api/scan', {
//         url,
//         scanType: 'full',
//       });

//       // Simulate fetching results (replace with real call if needed)
//       setTimeout(() => {
//         setResults(response.data); // Assuming the response has findings
//         setLoading(false);
//       }, 2000);
//     } catch (err) {
//       setError('Scan failed. Please check your backend.');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="scan-form">
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           placeholder="Enter website URL"
//           required
//         />
//         <button type="submit">Start Scan</button>
//       </form>

//       {loading && <Loader />}

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {results && (
//         <div className="results" style={{ marginTop: '20px' }}>
//           <h3>Scan Completed ✅</h3>
//           <pre>{JSON.stringify(results, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ScanForm;
