import React, { useState } from 'react';
import axios from 'axios';

function DemoEmailAlert() {
  const [ownerEmail, setOwnerEmail] = useState(localStorage.getItem('ownerEmail') || 'owner@example.com');
  const [ownerName, setOwnerName] = useState(localStorage.getItem('ownerName') || 'Property Owner');
  const [flatno, setFlatno] = useState(localStorage.getItem('flatno') || '101');
  const [gasLevel, setGasLevel] = useState(7);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:9000/api/sendGasAlert', {
        ownerEmail,
        ownerName,
        flatno,
        gasLevel,
      });

      if (response.status === 200) {
        setStatus(`✅ Email alert sent to ${ownerEmail}`);
      } else {
        setStatus('⚠️ Email alert request completed with unexpected status.');
      }
    } catch (error) {
      console.error('Email alert error:', error);
      setStatus(error.response?.data?.message || '❌ Failed to send email alert.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Demo Gas Alert Email</h2>
      <p className="text-sm text-gray-600 mb-4">
        Use this form to test the `/api/sendGasAlert` email endpoint directly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Owner Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Owner Name</label>
          <input
            type="text"
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Flat Number</label>
          <input
            type="text"
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={flatno}
            onChange={(e) => setFlatno(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gas Level (ppm)</label>
          <input
            type="number"
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={gasLevel}
            onChange={(e) => setGasLevel(Number(e.target.value))}
            min="0"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={loading}
        >
          {loading ? 'Sending email...' : 'Send Email Alert'}
        </button>
      </form>

      {status && (
        <div className="mt-4 p-3 rounded-lg bg-gray-100 text-gray-800 border border-gray-200">
          {status}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        Tip: use a real email address and make sure the backend is running on <strong>http://localhost:9000</strong>.
      </div>
    </div>
  );
}

export default DemoEmailAlert;
